export type Gender = "Male" | "Female" | "Other";
export type CivilStatus =
  | "Single"
  | "Married"
  | "Divorced"
  | "Separated"
  | "Widowed";
export type ClientType = "General Public" | "Student" | "Government Employee";

export interface PersonalInfo {
  name?: string;
  age?: number;
  gender?: Gender;
  civilStatus?: CivilStatus;
  residence?: string;
  course?: string;
  yearLevel?: string;
  occupation?: string;
  clientType?: ClientType;
}

export type Rating = 5 | 4 | 3 | 2 | 1 | "N/A";

export interface ServiceQuality {
  satisfaction?: Rating;
  responsiveness?: Rating;
  communication?: Rating;
  reliability?: Rating;
  integrity?: Rating;
  assurance?: Rating;
  access?: Rating;
  costs?: Rating;
  outcome?: Rating;
}

export interface Service {
  name: string;
  category: "internal" | "external" | "internal/external";
}

export interface SurveyFormData {
  date: string;
  ticketCode: string;
  timeIn: string;
  timeOut: string;
  personalInfo: PersonalInfo;
  cc1: string;
  cc2?: string;
  cc3?: string;
  services: string[];
  quality: ServiceQuality;
  comments?: string;
  officeId: string;
}

export interface Office {
  id: string;
  name: string;
  services: Service[];
}
