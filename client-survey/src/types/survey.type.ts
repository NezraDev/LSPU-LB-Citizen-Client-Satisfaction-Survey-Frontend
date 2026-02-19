export type ClientType = "General Public" | "Student" | "Government Employee";

export type Rating = 5 | 4 | 3 | 2 | 1 | "N/A";

export interface Service {
  name: string;
}

export interface Office {
  id: string;
  name: string;
  services: Service[];
}

export interface PersonalInfo {
  name?: string;
  age?: number;
  gender?: string;
  civilStatus?: string;
  residence: string;
  course?: string;
  yearLevel?: string;
  occupation?: string;
  clientType?: ClientType;
}

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

export interface SurveyFormData {
  date: string;
  ticketCode: string;
  timeIn: string;
  timeOut: string;
  officeId: string;
  personalInfo: PersonalInfo;
  cc1: string;
  cc2: string;
  cc3: string;
  services: string[];
  quality: ServiceQuality;
  comments?: string;
}

export interface FormErrors {
  personalInfo: Partial<Record<keyof PersonalInfo, string>>;
  quality: Partial<Record<keyof ServiceQuality, string>>;
  cc1?: string;
  cc2?: string;
  cc3?: string;
  services?: string;
  ticketCode?: string;
}
