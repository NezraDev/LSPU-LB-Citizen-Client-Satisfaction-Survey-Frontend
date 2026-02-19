import { useState, useEffect, useCallback } from "react";
import { submitSurvey } from "../services/survey";
import { formatDate, formatTime12Hour } from "../utils/dateUtils";
import { validateSurveyForm, CC1_OPTION_NA } from "../utils/validationUtils";
import type {
  SurveyFormData,
  Office,
  PersonalInfo,
  ServiceQuality,
  FormErrors,
} from "../types/survey.type";

const getInitialFormData = (officeId: string): SurveyFormData => {
  const now = new Date();
  return {
    date: formatDate(now),
    ticketCode: "",
    timeIn: formatTime12Hour(now),
    timeOut: formatTime12Hour(now),
    officeId,
    personalInfo: {
      name: "",
      age: undefined,
      gender: undefined,
      civilStatus: undefined,
      residence: "",
      course: "",
      yearLevel: "",
      occupation: "",
      clientType: undefined,
    },
    cc1: "",
    cc2: "",
    cc3: "",
    services: [],
    quality: {
      satisfaction: undefined,
      responsiveness: undefined,
      communication: undefined,
      reliability: undefined,
      integrity: undefined,
      assurance: undefined,
      access: undefined,
      costs: undefined,
      outcome: undefined,
    },
    comments: "",
  };
};

export const useSurveyForm = (office: Office) => {
  const [formData, setFormData] = useState<SurveyFormData>(() =>
    getInitialFormData(office.id),
  );
  const [errors, setErrors] = useState<FormErrors>({
    personalInfo: {},
    quality: {},
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormData((prev) => ({
        ...prev,
        timeOut: formatTime12Hour(new Date()),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = useCallback(
    <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => {
      setFormData((prev) => {
        const newData = { ...prev, [field]: value };
        if (field === "cc1" && value === CC1_OPTION_NA) {
          newData.cc2 = "N/A";
          newData.cc3 = "N/A";
        }
        return newData;
      });

      // Clear the specific field error when user starts typing
      setErrors((prev) => {
        const updated = { ...prev };
        if (field === "cc1") {
          updated.cc1 = undefined;
          updated.cc2 = undefined;
          updated.cc3 = undefined;
        } else if (field === "cc2" || field === "cc3" || field === "services") {
        } else if (field === "ticketCode") {
          updated.ticketCode = undefined;
        }
        return updated;
      });
    },
    [],
  );

  const handlePersonalInfoChange = useCallback(
    <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
      setFormData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value },
      }));
      setErrors((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: undefined },
      }));

      if (field === "clientType") {
        setErrors((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            course: undefined,
            yearLevel: undefined,
            occupation: undefined,
          },
        }));
      }
    },
    [],
  );

  const handleQualityChange = useCallback(
    <K extends keyof ServiceQuality>(field: K, value: ServiceQuality[K]) => {
      setFormData((prev) => ({
        ...prev,
        quality: { ...prev.quality, [field]: value },
      }));
      setErrors((prev) => ({
        ...prev,
        quality: { ...prev.quality, [field]: undefined },
      }));
    },
    [],
  );

  const toggleService = useCallback((service: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.services.includes(service);
      const newServices = alreadySelected
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: newServices };
    });
    setErrors((prev) => ({ ...prev, services: undefined }));
  }, []);

  const handleSubmit = async () => {
    setSubmitError(null);
    const validationErrors = validateSurveyForm(formData);
    const hasErrors =
      Object.keys(validationErrors.personalInfo).length > 0 ||
      Object.keys(validationErrors.quality).length > 0 ||
      validationErrors.cc1 ||
      validationErrors.cc2 ||
      validationErrors.cc3 ||
      validationErrors.services ||
      validationErrors.ticketCode; // include ticketCode

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await submitSurvey({
        ...formData,
        officeName: office.name,
        submittedAt: new Date().toISOString(),
      });
      alert("Thank you for your feedback!");
      // Optionally reset form
    } catch (error) {
      setSubmitError("Submission failed, please try again");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    submitting,
    submitError,
    handleChange,
    handlePersonalInfoChange,
    handleQualityChange,
    toggleService,
    handleSubmit,
  };
};
