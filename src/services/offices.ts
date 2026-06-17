import api from "./api";
import type { SurveyResponse } from "../types/survey.type";

export const fetchOfficeById = async (
  qrToken: string,
): Promise<SurveyResponse> => {
  const response = await api.get<SurveyResponse>(`/survey/${qrToken}`);

  return response.data;
};
