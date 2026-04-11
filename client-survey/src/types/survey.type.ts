export type ClientType = "General Public" | "Student" | "Government Employee";

export type Rating = 5 | 4 | 3 | 2 | 1 | "N/A";

export interface Service {
  name: string;
  category?: string;
}

export interface SurveyQuestionOption {
  id: number;
  question_id: number;
  office_id?: number | null;
  option_text?: string;
  name?: string;
  category?: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SurveyQuestion {
  id: number;
  question_text: string;
  question_type: string;
  is_required: boolean;
  section_name: string;
  order: number;
  options: SurveyQuestionOption[];
}

export interface SurveyQuestionIds {
  personalInfo: {
    clientType?: number;
    name?: number;
    age?: number;
    gender?: number;
    civilStatus?: number;
    residence?: number;
    course?: number;
    yearLevel?: number;
    occupation?: number;
  };
  citizenCharter: {
    cc1?: number;
    cc2?: number;
    cc3?: number;
  };
  services?: number;
  quality: {
    satisfaction?: number;
    responsiveness?: number;
    communication?: number;
    reliability?: number;
    integrity?: number;
    assurance?: number;
    access?: number;
    costs?: number;
    outcome?: number;
  };
  comments?: number;
}

export interface Office {
  id: string;
  name: string;
  qrToken?: string;
  services: Service[];
  questionIds?: SurveyQuestionIds;
  questions?: SurveyQuestion[];
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

export type ServiceQualityMap = Record<string, ServiceQuality>;

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
  qualityByService: ServiceQualityMap;
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
