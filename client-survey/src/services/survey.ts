import api from "./api";
import type { SurveyFormData } from "../types/survey.type";

export const fetchTicketNumber = async (): Promise<string> => {
  const response = await api.get<{ ticketNumber: string }>("/ticket/new");
  return response.data.ticketNumber;
};

export const submitSurvey = async (
  data: SurveyFormData & { officeName: string; submittedAt: string },
): Promise<void> => {
  await api.post("/surveys", data);
};
