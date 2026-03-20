import api from "./api";
import type {
  Office,
  SurveyQuestion,
  SurveyQuestionIds,
} from "../types/survey.type";

interface SurveyApiResponse {
  office: {
    id: number;
    name: string;
    qr_token: string;
  };
  questions: SurveyQuestion[];
}

const normalizeSection = (value: string) => value.trim().toLowerCase();

const getQuestionId = (
  questions: SurveyQuestion[],
  sectionName: string,
  order: number,
): number | undefined =>
  questions.find(
    (q) => normalizeSection(q.section_name) === sectionName && q.order === order,
  )?.id;

const buildQuestionIds = (questions: SurveyQuestion[]): SurveyQuestionIds => ({
  personalInfo: {
    clientType: getQuestionId(questions, "personal info", 1),
    name: getQuestionId(questions, "personal info", 2),
    age: getQuestionId(questions, "personal info", 3),
    gender: getQuestionId(questions, "personal info", 4),
    civilStatus: getQuestionId(questions, "personal info", 5),
    residence: getQuestionId(questions, "personal info", 6),
    course: getQuestionId(questions, "personal info", 7),
    yearLevel: getQuestionId(questions, "personal info", 8),
    occupation: getQuestionId(questions, "personal info", 9),
  },
  citizenCharter: {
    cc1: getQuestionId(questions, "citizens charter questions", 1),
    cc2: getQuestionId(questions, "citizens charter questions", 2),
    cc3: getQuestionId(questions, "citizens charter questions", 3),
  },
  services: getQuestionId(questions, "services attained", 1),
  quality: {
    satisfaction: getQuestionId(questions, "services quality dimensions", 1),
    responsiveness: getQuestionId(questions, "services quality dimensions", 2),
    communication: getQuestionId(questions, "services quality dimensions", 3),
    reliability: getQuestionId(questions, "services quality dimensions", 4),
    integrity: getQuestionId(questions, "services quality dimensions", 5),
    assurance: getQuestionId(questions, "services quality dimensions", 6),
    access: getQuestionId(questions, "services quality dimensions", 7),
    costs: getQuestionId(questions, "services quality dimensions", 8),
    outcome: getQuestionId(questions, "services quality dimensions", 9),
  },
  comments: getQuestionId(questions, "comments and suggestions", 1),
});

const mapOfficeFromApi = (data: SurveyApiResponse): Office => {
  const servicesQuestion = data.questions.find(
    (q) => normalizeSection(q.section_name) === "services attained" && q.order === 1,
  );

  return {
    id: String(data.office.id),
    name: data.office.name,
    qrToken: data.office.qr_token,
    services:
      servicesQuestion?.options.map((option) => ({ name: option.option_text })) ?? [],
    questionIds: buildQuestionIds(data.questions),
    questions: data.questions,
  };
};

export const fetchOfficeById = async (qrToken: string): Promise<Office> => {
  const response = await api.get<SurveyApiResponse>(`/survey/${qrToken}`);
  return mapOfficeFromApi(response.data);
};
