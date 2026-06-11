import api from "./api";

export interface Classification {
  id: string;
  label: string;
}

export const fetchClassifications = async (): Promise<Classification[]> => {
  const response = await api.get<Classification[]>("/classifications");
  return response.data;
};
