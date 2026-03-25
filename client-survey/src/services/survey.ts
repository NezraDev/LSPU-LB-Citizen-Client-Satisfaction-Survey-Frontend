import api from "./api";
import axios from "axios";
import type {
  SurveyFormData,
  SurveyQuestionIds,
  SurveyQuestion,
  SurveyQuestionOption,
  ServiceQuality,
} from "../types/survey.type";

interface SurveyAnswer {
  question_id: number;
  answer: string | string[];
}

interface SubmitSurveyPayload {
  qr_token: string;
  ticket_code: string;
  answers: SurveyAnswer[];
}

const normalize = (value: string): string =>
  value
    .replace(/[\u2018\u2019]/g, "'")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const isNumericString = (value: string): boolean => /^\d+$/.test(value.trim());

const findOptionByFormValue = (
  options: SurveyQuestionOption[],
  value: string | number,
): SurveyQuestionOption | undefined => {
  const stringValue = String(value).trim();

  if (typeof value === "number" || isNumericString(stringValue)) {
    const asId = Number(stringValue);
    const byId = options.find((option) => option.id === asId);
    if (byId) {
      return byId;
    }
  }

  const normalizedValue = normalize(stringValue);

  return options.find((option) => {
    const normalizedOption = normalize(option.option_text);
    return (
      normalizedOption === normalizedValue ||
      normalizedOption.startsWith(`${normalizedValue} -`) ||
      normalizedOption.startsWith(`${normalizedValue}-`)
    );
  });
};

const getQuestionById = (
  questions: SurveyQuestion[],
  questionId: number,
): SurveyQuestion | undefined => questions.find((question) => question.id === questionId);

const addAnswer = (
  answers: SurveyAnswer[],
  questions: SurveyQuestion[],
  questionId: number | undefined,
  value: unknown,
) => {
  if (!questionId || value == null) {
    return;
  }

  // sa part na may comments refer nlng sa bug report for more info
  // https://docs.google.com/document/d/1XLiUg1vl8LMv67r8HV1QpLwhL0hExz1Yp7hLTaDG_mU/edit?tab=t.jvq5872xwmin
  // skip empty string answers before option mapping
  if (typeof value === "string" && value.trim().length === 0) { 
    return;
  }

  // skip empty array answers early
  if (Array.isArray(value) && value.length === 0) {
    return;
  }

  const question = getQuestionById(questions, questionId);
  if (!question) {
    return;
  }

  const isOptionQuestion =
    question.question_type === "radio" || question.question_type === "multiple_choice";
  const isCheckboxQuestion = question.question_type === "checkbox";

  if (isOptionQuestion) {
    if (Array.isArray(value)) {
      return;
    }

    const option = findOptionByFormValue(question.options, value as string | number);
    if (!option) {
      throw new Error(`Cannot map answer to option text for question ${questionId}.`);
    }

    answers.push({
      question_id: questionId,
      answer: option.option_text,
    });
    return;
  }

  if (isCheckboxQuestion) {
    if (!Array.isArray(value) || value.length === 0) {
      return;
    }

    const optionTexts = value
      .map(
        (item) => findOptionByFormValue(question.options, item as string | number)?.option_text,
      )
      .filter((optionText): optionText is string => typeof optionText === "string");

    if (optionTexts.length !== value.length) {
      throw new Error(`Cannot map one or more checkbox answers for question ${questionId}.`);
    }

    answers.push({
      question_id: questionId,
      answer: optionTexts,
    });
    return;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return;
    }

    answers.push({
      question_id: questionId,
      answer: value.join(", "),
    });
    return;
  }

  const stringValue = String(value).trim();
  if (stringValue.length === 0) {
    return;
  }

  answers.push({
    question_id: questionId,
    answer: stringValue,
  });
};

const mapQualityAnswers = (
  answers: SurveyAnswer[],
  questions: SurveyQuestion[],
  quality: ServiceQuality,
  questionIds: SurveyQuestionIds,
) => {
  const qualityPairs: Array<
    [keyof ServiceQuality, number | undefined]
  > = [
    ["satisfaction", questionIds.quality.satisfaction],
    ["responsiveness", questionIds.quality.responsiveness],
    ["communication", questionIds.quality.communication],
    ["reliability", questionIds.quality.reliability],
    ["integrity", questionIds.quality.integrity],
    ["assurance", questionIds.quality.assurance],
    ["access", questionIds.quality.access],
    ["costs", questionIds.quality.costs],
    ["outcome", questionIds.quality.outcome],
  ];

  qualityPairs.forEach(([field, questionId]) => {
    addAnswer(answers, questions, questionId, quality[field]);
  });
};

const buildSubmitPayload = (
  data: SurveyFormData,
  questionIds: SurveyQuestionIds,
  questions: SurveyQuestion[],
  qrToken: string,
): SubmitSurveyPayload => {
  const answers: SurveyAnswer[] = [];
  const isStudent = data.personalInfo.clientType === "Student";

  addAnswer(
    answers,
    questions,
    questionIds.personalInfo.clientType,
    data.personalInfo.clientType,
  );
  addAnswer(answers, questions, questionIds.personalInfo.name, data.personalInfo.name);
  addAnswer(answers, questions, questionIds.personalInfo.age, data.personalInfo.age);
  addAnswer(
    answers,
    questions,
    questionIds.personalInfo.gender,
    data.personalInfo.gender,
  );
  addAnswer(
    answers,
    questions,
    questionIds.personalInfo.civilStatus,
    data.personalInfo.civilStatus,
  );
  addAnswer(
    answers,
    questions,
    questionIds.personalInfo.residence,
    data.personalInfo.residence,
  );
  if (isStudent) {
    addAnswer(answers, questions, questionIds.personalInfo.course, data.personalInfo.course);
    addAnswer(
      answers,
      questions,
      questionIds.personalInfo.yearLevel,
      data.personalInfo.yearLevel,
    );
  }
  addAnswer(
    answers,
    questions,
    questionIds.personalInfo.occupation,
    data.personalInfo.occupation,
  );

  addAnswer(answers, questions, questionIds.citizenCharter.cc1, data.cc1);
  addAnswer(answers, questions, questionIds.citizenCharter.cc2, data.cc2);
  addAnswer(answers, questions, questionIds.citizenCharter.cc3, data.cc3);

  addAnswer(answers, questions, questionIds.services, data.services);

  mapQualityAnswers(answers, questions, data.quality, questionIds);

  addAnswer(answers, questions, questionIds.comments, data.comments);

  return {
    qr_token: qrToken.trim(),
    ticket_code: data.ticketCode.trim().toUpperCase(),
    answers,
  };
};

export const submitSurvey = async (
  data: SurveyFormData,
  questionIds: SurveyQuestionIds,
  questions: SurveyQuestion[],
  qrToken: string,
): Promise<void> => {
  try {
    const payload = buildSubmitPayload(data, questionIds, questions, qrToken);
    await api.post("/survey/submit", payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string } | undefined)?.message ||
        "Submission failed, please try again.";
      throw new Error(message);
    }
    throw error;
  }
};
