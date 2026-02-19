import { useState, useEffect, useCallback } from "react";
import { submitSurvey } from "../services/survey";
import type {
  SurveyFormData,
  Office,
  PersonalInfo,
  ServiceQuality,
} from "../types/survey.type";

const formatTime12Hour = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minutesStr = minutes.toString().padStart(2, "0");
  return `${hours}:${minutesStr} ${ampm}`;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Modal Logic
export const useSurveyForm = (office: Office) => {
  const [formData, setFormData] = useState<SurveyFormData>({
    date: formatDate(new Date()),
    ticketCode: "",
    timeIn: "",
    timeOut: "",
    officeId: office.id,
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
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    setFormData((prev) => ({
      ...prev,
      timeIn: formatTime12Hour(now),
      date: formatDate(now),
    }));

    const interval = setInterval(() => {
      const current = new Date();
      setFormData((prev) => ({
        ...prev,
        timeOut: formatTime12Hour(current),
        date: formatDate(current),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = useCallback(
    <K extends keyof SurveyFormData>(field: K, value: SurveyFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handlePersonalInfoChange = useCallback(
    <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]) => {
      setFormData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value },
      }));
    },
    [],
  );

  const handleQualityChange = useCallback(
    <K extends keyof ServiceQuality>(field: K, value: ServiceQuality[K]) => {
      setFormData((prev) => ({
        ...prev,
        quality: { ...prev.quality, [field]: value },
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
  }, []);

  // Modal Logic
  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitSurvey({
        ...formData,
        officeName: office.name,
        submittedAt: new Date().toISOString(),
      });
      alert("Thank you for your feedback!");
    } catch (error) {
      setSubmitError("Submission failed. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    submitting,
    submitError,
    handleChange,
    handlePersonalInfoChange,
    handleQualityChange,
    toggleService,
    handleSubmit,
  };
};
