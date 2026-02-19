import api from "./api";
import type { SurveyFormData } from "../types/survey.type";

export const submitSurvey = async (
  data: SurveyFormData & { officeName: string; submittedAt: string },
): Promise<void> => {
  await api.post("/surveys", data);
};
