import type {
  SurveyFormData,
  ServiceQuality,
  FormErrors,
} from "../types/survey.type";

export const QUALITY_DIMENSIONS: (keyof ServiceQuality)[] = [
  "satisfaction",
  "responsiveness",
  "communication",
  "reliability",
  "integrity",
  "assurance",
  "access",
  "costs",
  "outcome",
];

export const CLIENT_TYPES = {
  STUDENT: "Student",
  GENERAL_PUBLIC: "General Public",
  GOVERNMENT_EMPLOYEE: "Government Employee",
} as const;

export const CC1_OPTION_NA =
  "I do not know what a CC is and I did not see one in this office.";

export const validateSurveyForm = (data: SurveyFormData): FormErrors => {
  const errors: FormErrors = {
    personalInfo: {},
    quality: {},
  };

  // Ticket Code validation
  if (!data.ticketCode || data.ticketCode.trim() === "") {
    errors.ticketCode = "Ticket code is required";
  }

  const personalInfo = data.personalInfo;

  if (!personalInfo.clientType) {
    errors.personalInfo.clientType = "Client type is required";
  }
  if (!personalInfo.age || personalInfo.age <= 0) {
    errors.personalInfo.age = "Age is required and must be greater than 0";
  }
  if (!personalInfo.gender) {
    errors.personalInfo.gender = "Gender is required";
  }
  if (!personalInfo.civilStatus) {
    errors.personalInfo.civilStatus = "Civil status is required";
  }
  if (!personalInfo.residence?.trim()) {
    errors.personalInfo.residence = "Residence is required";
  }

  if (personalInfo.clientType === CLIENT_TYPES.STUDENT) {
    if (!personalInfo.course?.trim()) {
      errors.personalInfo.course = "Course is required for students";
    }
    if (!personalInfo.yearLevel?.trim()) {
      errors.personalInfo.yearLevel = "Year level is required for students";
    }
  } else if (
    personalInfo.clientType === CLIENT_TYPES.GENERAL_PUBLIC ||
    personalInfo.clientType === CLIENT_TYPES.GOVERNMENT_EMPLOYEE
  ) {
    if (!personalInfo.occupation?.trim()) {
      errors.personalInfo.occupation = "Occupation is required";
    }
  }

  if (!data.cc1) {
    errors.cc1 = "Please answer this question.";
  }

  const isCC1NA = data.cc1 === CC1_OPTION_NA;

  if (!isCC1NA) {
    if (!data.cc2) errors.cc2 = "Please answer this question.";
    if (!data.cc3) errors.cc3 = "Please answer this question.";
  }

  if (data.services.length === 0) {
    errors.services = "Please select at least one service";
  }

  QUALITY_DIMENSIONS.forEach((dim) => {
    if (data.quality[dim] == null) {
      errors.quality[dim] = "This rating is required";
    }
  });

  return errors;
};
