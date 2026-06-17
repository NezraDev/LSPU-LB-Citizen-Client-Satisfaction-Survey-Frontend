import api from "./api"; // Ensure this path matches your axios instance
import type {
  SurveyFormData,
  SurveyQuestion,
  SurveyQuestionOption,
  ServiceQuality,
} from "../types/survey.type";

const dimensionKeyMap: Record<number, keyof ServiceQuality> = {
  1: "satisfaction",
  2: "responsiveness",
  3: "communication",
  4: "reliability",
  5: "integrity",
  6: "assurance",
  7: "access",
  8: "costs",
  9: "outcome",
};

export const submitSurvey = async (
  data: SurveyFormData,
  questions: SurveyQuestion[],
  qrToken: string,
  servicesList: SurveyQuestionOption[],
) => {
  const responses: any[] = [];

  const addResponse = (
    question: SurveyQuestion | undefined,
    answerText: string | number | undefined | null,
    serviceId?: number,
  ) => {
    if (
      !question ||
      answerText === undefined ||
      answerText === null ||
      answerText === ""
    )
      return;

    const option = question.options?.find(
      (o) =>
        o.option_text === String(answerText) || o.name === String(answerText),
    );

    responses.push({
      question_id: question.id,
      option_id: option ? option.id : null,
      text_response: option ? null : String(answerText),
      service_id: serviceId || null,
    });
  };

  const getQ = (sectionKeyword: string, qKeyword: string) =>
    questions.find(
      (q) =>
        q.section_name.toLowerCase().includes(sectionKeyword) &&
        q.question_text.toLowerCase().includes(qKeyword),
    );

  // 1. Map Personal Info
  addResponse(
    getQ("personal info", "relationship"),
    data.personalInfo.relationship,
  );
  addResponse(
    getQ("personal info", "client type"),
    data.personalInfo.clientType,
  );
  addResponse(getQ("personal info", "name"), data.personalInfo.name);
  addResponse(getQ("personal info", "age"), data.personalInfo.age);
  addResponse(getQ("personal info", "sex"), data.personalInfo.gender);
  addResponse(
    getQ("personal info", "civil status"),
    data.personalInfo.civilStatus,
  );
  addResponse(getQ("personal info", "residence"), data.personalInfo.residence);
  addResponse(getQ("personal info", "course"), data.personalInfo.course);
  addResponse(getQ("personal info", "year level"), data.personalInfo.yearLevel);
  addResponse(
    getQ("personal info", "occupation"),
    data.personalInfo.occupation,
  );

  // 2. Map Citizen's Charter
  const ccQs = questions.filter((q) =>
    q.section_name.toLowerCase().includes("citizens charter"),
  );
  addResponse(
    ccQs.find((q) => q.order === 1),
    data.cc1,
  );
  addResponse(
    ccQs.find((q) => q.order === 2),
    data.cc2,
  );
  addResponse(
    ccQs.find((q) => q.order === 3),
    data.cc3,
  );

  // 3. Map Services Attained
  const servicesQ = questions.find((q) =>
    q.section_name.toLowerCase().includes("services attained"),
  );
  if (servicesQ && data.services.length > 0) {
    data.services.forEach((selectedServiceName) => {
      const opt = servicesQ.options?.find(
        (o) =>
          o.name === selectedServiceName ||
          o.option_text === selectedServiceName,
      );
      if (opt) {
        responses.push({
          question_id: servicesQ.id,
          option_id: opt.id,
          text_response: null,
          service_id: null,
        });
      }
    });
  }

  // 4. Map Service Quality Matrix
  const qualityQs = questions.filter((q) =>
    q.section_name.toLowerCase().includes("services quality"),
  );

  Object.entries(data.qualityMap || {}).forEach(([serviceName, ratings]) => {
    const serviceOpt = servicesList.find(
      (s) => s.name === serviceName || s.option_text === serviceName,
    );
    const serviceId = serviceOpt ? serviceOpt.id : undefined;

    qualityQs.forEach((q) => {
      const stateKey = dimensionKeyMap[q.order];
      if (stateKey) {
        const ratingValue = ratings[stateKey];
        if (ratingValue !== undefined) {
          addResponse(q, ratingValue, serviceId);
        }
      }
    });
  });

  // 5. Map Comments
  addResponse(getQ("comments", ""), data.comments);

  const payload = {
    ticket_code: data.ticketCode,
    date: data.date,
    time_in: data.timeIn,
    time_out: data.timeOut,
    office_id: data.officeId,
    qr_token: qrToken,
    responses: responses,
  };

  const res = await api.post("/survey/submit", payload);
  return res.data;
};
