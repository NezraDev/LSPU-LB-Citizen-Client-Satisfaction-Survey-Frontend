import { useState, useCallback, useEffect } from "react";
import { submitSurvey } from "../services/survey";
import { formatDate, formatTime12Hour } from "../utils/dateUtils";
import type {
  SurveyQuestion,
  Service,
  SurveyQuestionIds,
} from "../types/survey.type";

// Build questionIds by section_name + order (same logic as in offices.ts)
const buildQuestionIds = (questions: SurveyQuestion[]): SurveyQuestionIds => {
  const normalize = (s: string) => s.trim().toLowerCase();

  const getQuestionId = (section: string, order: number) =>
    questions.find(
      (q) =>
        normalize(q.section_name) === normalize(section) && q.order === order,
    )?.id;

  return {
    personalInfo: {
      clientType: getQuestionId("personal info", 1),
      name: getQuestionId("personal info", 2),
      age: getQuestionId("personal info", 3),
      gender: getQuestionId("personal info", 4),
      civilStatus: getQuestionId("personal info", 5),
      residence: getQuestionId("personal info", 6),
      course: getQuestionId("personal info", 7),
      yearLevel: getQuestionId("personal info", 8),
      occupation: getQuestionId("personal info", 9),
    },
    citizenCharter: {
      cc1: getQuestionId("citizens charter questions", 1),
      cc2: getQuestionId("citizens charter questions", 2),
      cc3: getQuestionId("citizens charter questions", 3),
    },
    services: getQuestionId("services attained", 1),
    quality: {
      satisfaction: getQuestionId("services quality dimensions", 1),
      responsiveness: getQuestionId("services quality dimensions", 2),
      communication: getQuestionId("services quality dimensions", 3),
      reliability: getQuestionId("services quality dimensions", 4),
      integrity: getQuestionId("services quality dimensions", 5),
      assurance: getQuestionId("services quality dimensions", 6),
      access: getQuestionId("services quality dimensions", 7),
      costs: getQuestionId("services quality dimensions", 8),
      outcome: getQuestionId("services quality dimensions", 9),
    },
    comments: getQuestionId("comments and suggestions", 1),
  };
};

// Transform dynamic answers into the legacy SurveyFormData structure expected by submitSurvey
const buildLegacyFormData = (
  answers: Record<number, any>,
  questionIds: SurveyQuestionIds,
  ticketCode: string,
  officeId: string,
) => {
  const now = new Date();
  const getAnswer = (qid?: number) =>
    qid !== undefined ? answers[qid] : undefined;

  // Map services selected from the "services attained" question
  const servicesQuestionId = questionIds.services;
  const selectedServiceNames =
    servicesQuestionId !== undefined
      ? (getAnswer(servicesQuestionId) as string[]) || []
      : [];

  // Build qualityMap for each selected service
  const qualityMap: Record<string, any> = {};
  const qualityFields = questionIds.quality as Record<string, number>;
  for (const serviceName of selectedServiceNames) {
    const quality: any = {};
    for (const [field, qid] of Object.entries(qualityFields)) {
      const ans = answers[qid];
      if (ans && typeof ans === "object" && ans.serviceId === service.id) {
        quality[field] = ans.value;
      }
    }
    qualityMap[serviceName] = quality;
  }

  return {
    date: formatDate(now),
    ticketCode,
    timeIn: formatTime12Hour(now),
    timeOut: formatTime12Hour(now),
    officeId,
    personalInfo: {
      name: getAnswer(questionIds.personalInfo.name) || "",
      age: getAnswer(questionIds.personalInfo.age),
      gender: getAnswer(questionIds.personalInfo.gender) || "",
      civilStatus: getAnswer(questionIds.personalInfo.civilStatus) || "",
      residence: getAnswer(questionIds.personalInfo.residence) || "",
      course: getAnswer(questionIds.personalInfo.course) || "",
      yearLevel: getAnswer(questionIds.personalInfo.yearLevel) || "",
      occupation: getAnswer(questionIds.personalInfo.occupation) || "",
      clientType: getAnswer(questionIds.personalInfo.clientType),
    },
    cc1: getAnswer(questionIds.citizenCharter.cc1) || "",
    cc2: getAnswer(questionIds.citizenCharter.cc2) || "",
    cc3: getAnswer(questionIds.citizenCharter.cc3) || "",
    services: selectedServiceNames,
    quality: {}, // not used because qualityMap is used
    qualityMap,
    comments: getAnswer(questionIds.comments) || "",
  };
};

export const useDynamicSurveyForm = (
  questions: SurveyQuestion[],
  qrToken: string,
) => {
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [errors, setErrors] = useState<Record<number, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const questionIds = buildQuestionIds(questions);

  const updateAnswer = useCallback((questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => ({ ...prev, [questionId]: undefined }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<number, string> = {};
    for (const q of questions) {
      if (q.is_required) {
        const val = answers[q.id];
        if (
          val === undefined ||
          val === null ||
          (typeof val === "string" && val.trim() === "") ||
          (Array.isArray(val) && val.length === 0)
        ) {
          newErrors[q.id] = "This field is required.";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [questions, answers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Get ticket code from a dedicated question (assuming it exists)
      // For now, we'll look for a question with "ticket" in its text or use a prompt.
      // A better approach: add a hidden question or extract from QR token.
      let ticketCode = "";
      const ticketQuestion = questions.find((q) =>
        q.question_text.toLowerCase().includes("ticket"),
      );
      if (ticketQuestion) {
        ticketCode = (answers[ticketQuestion.id] as string) || "";
      }
      if (!ticketCode) {
        ticketCode = prompt("Enter ticket code:") || "";
      }
      if (!ticketCode) throw new Error("Ticket code required");

      const formData = buildLegacyFormData(
        answers,
        questionIds,
        ticketCode,
        "office-id-placeholder",
      );

      await submitSurvey(formData, questionIds, questions, qrToken);
      setIsSuccessOpen(true);
    } catch (err: any) {
      setSubmitError(err.message);
      setErrorMessage(err.message);
      setIsErrorOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    answers,
    errors,
    submitting,
    submitError,
    updateAnswer,
    handleSubmit,
    isErrorOpen,
    setIsErrorOpen,
    errorMessage,
    isSuccessOpen,
    setIsSuccessOpen,
  };
};
