import api from "./api";
import type { Service } from "../types/survey.type";

interface ServicesResponse {
  services: Service[];
}

export const fetchServices = async (): Promise<Service[]> => {
  const response = await api.get<ServicesResponse>(
    "/survey/med-qr/questions-and-services",
  );
  return response.data.services;
};
