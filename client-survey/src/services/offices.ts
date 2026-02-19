import api from "./api";
import type { Office } from "../types/survey.type";
import { offices } from "../config/offices";

const USE_MOCK = true;

export const fetchOffices = async (): Promise<Office[]> => {
  const response = await api.get<Office[]>("/offices");
  return response.data;
};

export const fetchOfficeById = async (id: string): Promise<Office> => {
  if (USE_MOCK) {
    const office = offices.find((o) => o.id === id);

    if (!office) {
      throw new Error("Office not found");
    }

    return office;
  }

  const response = await api.get<Office>(`/offices/${id}`);
  return response.data;
};
