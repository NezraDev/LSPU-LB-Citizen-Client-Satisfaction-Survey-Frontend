import React, { useMemo } from "react";
import type {
  ServiceQuality as ServiceQualityType,
  Rating,
  SurveyQuestion,
} from "../types/survey.type";

interface ServiceQualityProps {
  data: Record<string, ServiceQualityType>;
  questions: SurveyQuestion[]; // 1. Added questions prop
  selectedServices?: string[];
  onChange: (
    service: string,
    field: keyof ServiceQualityType,
    value: Rating,
  ) => void;
  errors?: Partial<Record<keyof ServiceQualityType, string>>;
}

// 2. Map the backend API's "order" to your existing strictly typed state keys
const dimensionKeyMap: Record<number, keyof ServiceQualityType> = {
  1: "satisfaction",
  2: "responsiveness",
  3: "communication",
  4: "reliability",
  5: "integrity",
  6: "assurance",
  7: "access",
  8: "costs",
  9: "outcome",
};

const emptyQuality: ServiceQualityType = {
  satisfaction: undefined,
  responsiveness: undefined,
  communication: undefined,
  reliability: undefined,
  integrity: undefined,
  assurance: undefined,
  access: undefined,
  costs: undefined,
  outcome: undefined,
};

export const ServiceQuality: React.FC<ServiceQualityProps> = ({
  data,
  questions,
  selectedServices = [],
  onChange,
}) => {
  const [index, setIndex] = React.useState(0);
  const [showError, setShowError] = React.useState(false);

  // 3. Sort questions by API order to ensure they render exactly as the backend intends
  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => a.order - b.order);
  }, [questions]);

  // 4. Dynamically extract the rating headers (5, 4, 3, 2, 1, N/A) from the first question
  const ratingValues = useMemo(() => {
    if (sortedQuestions.length === 0 || !sortedQuestions[0].options) return [];
    return sortedQuestions[0].options
      .sort((a, b) => a.order - b.order)
      .map((opt) => opt.option_text as Rating);
  }, [sortedQuestions]);

  const currentService = selectedServices[index];
  const currentData: ServiceQualityType =
    data?.[currentService] ?? emptyQuality;

  const handleSelect = (field: keyof ServiceQualityType, value: Rating) => {
    if (!currentService) return;
    onChange(currentService, field, value);
  };

  // Check completion dynamically against the actual questions provided by the API
  const isComplete = sortedQuestions.every((q) => {
    const key = dimensionKeyMap[q.order];
    if (!key) return true; // Safety fallback
    return currentData?.[key] !== undefined;
  });

  const isLastService = index >= selectedServices.length - 1;

  const next = () => {
    if (!currentService) return;

    if (!isComplete) {
      setShowError(true);
      return;
    }

    setShowError(false);

    if (!isLastService) {
      setIndex((prev) => Math.min(prev + 1, selectedServices.length - 1));
    }
  };

  const prev = () => {
    setShowError(false);
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  if (sortedQuestions.length === 0) return null;

  return (
    <fieldset className="w-full border border-gray-300 rounded-md p-2 sm:p-4">
      <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
        SERVICE QUALITY DIMENSIONS
      </legend>

      <div
        className={`text-center font-bold mb-3 ${
          !currentService ? "text-red-500" : "text-gray-700"
        }`}
      >
        {currentService || "Please select a service first"}
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-md p-2 sm:p-3 mb-4 text-xs sm:text-sm text-gray-700">
        <p className="font-medium">Rate each statement:</p>
        <ul className="list-inside mt-1 grid grid-cols-2 sm:grid-cols-3 gap-x-2 sm:gap-x-4 gap-y-1">
          <li>
            <span className="font-semibold">5</span> – Strongly Agree
          </li>
          <li>
            <span className="font-semibold">4</span> – Agree
          </li>
          <li>
            <span className="font-semibold">3</span> – Neither Agree nor
            Disagree
          </li>
          <li>
            <span className="font-semibold">2</span> – Disagree
          </li>
          <li>
            <span className="font-semibold">1</span> – Strongly Disagree
          </li>
          <li>
            <span className="font-semibold">N/A</span> – Not Applicable
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 z-10">
                Dimension
              </th>
              {ratingValues.map((val) => (
                <th
                  key={String(val)}
                  className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {sortedQuestions.map((q) => {
              const stateKey = dimensionKeyMap[q.order];
              if (!stateKey) return null;

              const isMissing = currentData?.[stateKey] === undefined;

              return (
                <tr key={q.id}>
                  <td className="px-2 sm:px-4 py-2 text-gray-700">
                    {/* Render text directly from the API */}
                    {q.question_text}
                    {showError && isMissing && (
                      <span className="ml-2 text-red-500 text-xs">
                        * Required
                      </span>
                    )}
                  </td>

                  {ratingValues.map((value) => (
                    <td
                      key={String(value)}
                      className={`px-4 py-2 text-center ${
                        !currentService
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={() =>
                        currentService && handleSelect(stateKey, value)
                      }
                    >
                      <input
                        type="radio"
                        name={`${currentService}-${stateKey}`}
                        className="w-[18px] h-[18px] accent-blue-600"
                        checked={data?.[currentService]?.[stateKey] === value}
                        readOnly
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showError && !isComplete && (
          <p className="text-red-500 text-sm mt-2">
            Please rate all service quality dimensions.
          </p>
        )}
      </div>

      {selectedServices.length > 1 && (
        <div className="flex justify-between items-center mt-6 px-2">
          <button
            type="button"
            onClick={prev}
            disabled={!currentService || index === 0}
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-3 sm:py-2 px-6 sm:px-8 rounded-md transition w-full sm:w-auto text-sm disabled:opacity-50"
          >
            Back
          </button>

          {!isLastService && (
            <button
              type="button"
              onClick={next}
              disabled={!currentService}
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-3 sm:py-2 px-6 sm:px-8 rounded-md transition w-full sm:w-auto text-sm disabled:opacity-50"
            >
              {selectedServices[index + 1]
                ? `${selectedServices[index + 1]}`
                : "Next"}
            </button>
          )}
        </div>
      )}
    </fieldset>
  );
};
