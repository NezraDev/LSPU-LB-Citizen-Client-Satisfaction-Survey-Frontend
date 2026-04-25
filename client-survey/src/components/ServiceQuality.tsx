import React from "react";
import type {
  ServiceQuality as ServiceQualityType,
  Rating,
} from "../types/survey.type";

interface ServiceQualityProps {
  data: Record<string, ServiceQualityType>;
  selectedServices?: string[];
  onChange: (
    service: string,
    field: keyof ServiceQualityType,
    value: Rating
  ) => void;
  errors?: Partial<Record<keyof ServiceQualityType, string>>;
}

const dimensions: { name: keyof ServiceQualityType; label: string }[] = [
  {
    name: "satisfaction",
    label: "I am satisfied with the service that I availed",
  },
  {
    name: "responsiveness",
    label:
      "I spent a reasonable amount of time for my transaction (Responsiveness)",
  },
  {
    name: "communication",
    label:
      "I easily found information about my transaction from the office or its website. (Communication)",
  },
  {
    name: "reliability",
    label:
      "The office followed the transaction’s requirements and steps based on the information provided (Reliability)",
  },
  {
    name: "integrity",
    label:
      "I feel the office was fair to everyone, or “walang palakasan”, during my transaction (Integrity)",
  },
  {
    name: "assurance",
    label:
      "I was treated courteously by the staff, and (if asked for help) the staff was helpful (Assurance)",
  },
  {
    name: "access",
    label:
      "The steps (including payment) I needed to do for my transaction were easy and simple (Access and Facilities)",
  },
  {
    name: "costs",
    label: "I paid a reasonable amount of fees for my transaction (Costs)",
  },
  {
    name: "outcome",
    label:
      "I got what I needed from the government office, or (if denied) denial of request was sufficiently explained to me (Outcome)",
  },
];

const ratingValues: Rating[] = [5, 4, 3, 2, 1, "N/A"];

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

const ServiceQuality: React.FC<ServiceQualityProps> = ({
  data,
  selectedServices = [],
  onChange,
}) => {
  const [index, setIndex] = React.useState(0);
  const [showError, setShowError] = React.useState(false);

  const currentService = selectedServices[index];

  const currentData: ServiceQualityType =
    data?.[currentService] ?? emptyQuality;

  const handleSelect = (field: keyof ServiceQualityType, value: Rating) => {
    if (!currentService) return;
    onChange(currentService, field, value);
  };

  const isComplete = dimensions.every(
    (d) => currentData?.[d.name] !== undefined
  );

  const isLastService = index >= selectedServices.length - 1;

  const next = () => {
    if (!currentService) return;

    if (!isComplete) {
      setShowError(true);
      return;
    }

    setShowError(false);

    if (!isLastService) {
      setIndex((prev) =>
        Math.min(prev + 1, selectedServices.length - 1)
      );
    }
  };

  const prev = () => {
    setShowError(false);
    setIndex((prev) => Math.max(prev - 1, 0));
  };

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
            <span className="font-semibold">3</span> – Neither Agree nor Disagree
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
            {dimensions.map((dim) => {
              const isMissing = currentData?.[dim.name] === undefined;

              return (
                <tr key={dim.name}>
                  <td className="px-2 sm:px-4 py-2 text-gray-700">
                    {dim.label}
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
                        currentService && handleSelect(dim.name, value)
                      }
                    >
                      <input
                        type="radio"
                        name={`${currentService}-${dim.name}`}
                        className="w-[18px] h-[18px] accent-blue-600"
                        checked={
                          data?.[currentService]?.[dim.name] === value
                        }
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
          {index > 0 ? (
            <button
              type="button"
              onClick={prev}
              disabled={!currentService}
              className="px-6 py-2 rounded-md border border-green-600/90 text-green-600 font-medium hover:bg-green-50 disabled:opacity-40 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Prev
            </button>
          ) : (
            <div />
          )}

          {!isLastService && (
            <button
              type="button"
              onClick={next}
              disabled={!currentService}
              className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium disabled:opacity-40 flex items-center"
            >
              {selectedServices[index + 1] || "Next"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </fieldset>
  );
};

export default ServiceQuality;
