import React from "react";
import type {
  ServiceQuality as ServiceQualityType,
  Rating,
} from "../types/survey.type";

interface ServiceQualityProps {
  data: ServiceQualityType;
  onChange: <K extends keyof ServiceQualityType>(
    field: K,
    value: Rating,
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

export const ServiceQuality: React.FC<ServiceQualityProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  return (
    <fieldset className="w-full border border-gray-300 rounded-md p-2 sm:p-4">
      <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
        SERVICE QUALITY DIMENSIONS
      </legend>

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
              <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                Dimension
              </th>
              {ratingValues.map((val) => (
                <th
                  key={val}
                  className="px-1 sm:px-2 py-1 sm:py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[2rem] xs:min-w-[2.5rem] sm:min-w-[3rem]"
                >
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dimensions.map((dim) => (
              <tr key={dim.name}>
                <td className="px-2 sm:px-4 py-1 sm:py-2 text-gray-700 sticky left-0 bg-white text-[0.7rem] xs:text-xs sm:text-sm">
                  {dim.label}
                  {errors[dim.name] && (
                    <span className="ml-2 text-red-500 text-xs">
                      * Required
                    </span>
                  )}
                </td>
                {ratingValues.map((value) => (
                  <td
                    key={value}
                    className="px-1 sm:px-2 py-1 sm:py-2 text-center"
                  >
                    <input
                      type="radio"
                      value={value}
                      checked={data[dim.name] === value}
                      onChange={() => onChange(dim.name, value)}
                      className="focus:ring-blue-500 h-5 w-5 xs:h-4 xs:w-4 sm:h-4 sm:w-4 text-blue-600 cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {Object.keys(errors).length > 0 && (
          <p className="text-red-500 text-sm mt-2">
            Please rate all service quality dimensions.
          </p>
        )}
      </div>
    </fieldset>
  );
};
