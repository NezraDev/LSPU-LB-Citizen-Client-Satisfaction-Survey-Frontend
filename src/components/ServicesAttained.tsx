import React from "react";
// Update the import to use the combined SurveyQuestionOption type
import type { SurveyQuestionOption } from "../types/survey.type";

interface ServicesAttainedProps {
  services: SurveyQuestionOption[]; // Changed from Service to SurveyQuestionOption
  selectedServices: string[];
  onToggle: (serviceName: string) => void;
  error?: string;
}

export const ServicesAttained: React.FC<ServicesAttainedProps> = ({
  services,
  selectedServices,
  onToggle,
  error,
}) => {
  if (!services || services.length === 0) return null; // Don't render if API sends no services

  return (
    <fieldset className="border border-gray-300 rounded-md p-4">
      <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
        SERVICES ATTAINED
      </legend>

      <p className="text-sm text-gray-600 mb-3">
        Please check all services you have attained from this office/unit.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {services.map((service) => {
          // The API uses 'name' for services, but we add a fallback to 'option_text'
          // just in case the backend ever standardizes it in the future.
          const serviceName = service.name || service.option_text || "";

          return (
            <label key={service.id} className="flex items-start space-x-2">
              <input
                type="checkbox"
                value={serviceName}
                checked={selectedServices.includes(serviceName)}
                onChange={() => onToggle(serviceName)}
                className="mt-1 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{serviceName}</span>
            </label>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </fieldset>
  );
};
