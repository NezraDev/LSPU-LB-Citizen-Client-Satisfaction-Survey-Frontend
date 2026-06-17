import api from "./api";
import type { SurveyQuestion } from "../types/survey.type";

interface QuestionsResponse {
  questions: SurveyQuestion[];
}

export const fetchQuestions = async (): Promise<SurveyQuestion[]> => {
  const response = await api.get<QuestionsResponse>(
    "/survey/med-qr/questions-and-services",
  );
  return response.data.questions;
};
