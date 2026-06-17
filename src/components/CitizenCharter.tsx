import React from "react";
import type { SurveyQuestion } from "../types/survey.type";

interface CitizenCharterProps {
  cc1: string;
  cc2: string;
  cc3: string;
  questions: SurveyQuestion[]; // Added dynamic questions prop
  onCC1Change: (value: string) => void;
  onCC2Change: (value: string) => void;
  onCC3Change: (value: string) => void;
  errors?: {
    cc1?: string;
    cc2?: string;
    cc3?: string;
  };
}

export const CitizenCharter: React.FC<CitizenCharterProps> = ({
  cc1,
  cc2,
  cc3,
  questions,
  onCC1Change,
  onCC2Change,
  onCC3Change,
  errors = {},
}) => {
  // 1. Extract the specific CC questions based on their API 'order'
  const cc1Data = questions.find((q) => q.order === 1);
  const cc2Data = questions.find((q) => q.order === 2);
  const cc3Data = questions.find((q) => q.order === 3);

  // 2. Dynamic conditional logic: Hide CC2 & CC3 if the 4th option of CC1 is selected.
  // We grab the exact text of option index [3] from the API to make this bulletproof.
  const hideConditionText =
    cc1Data?.options?.[3]?.option_text ||
    "I do not know what a CC is and I did not see one in this office.";
  const showCC2_3 = cc1 && cc1 !== hideConditionText;

  return (
    <fieldset className="border border-gray-300 rounded-md p-4">
      <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
        CITIZEN'S CHARTER (CC) QUESTIONS
      </legend>

      {/* CC1 */}
      {cc1Data && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CC1: {cc1Data.question_text}{" "}
            {cc1Data.is_required && <span className="text-red-500">*</span>}
          </label>
          <div className="space-y-2">
            {cc1Data.options?.map((opt) => (
              <label key={opt.id} className="flex items-start space-x-2">
                <input
                  type="radio"
                  name="cc1"
                  value={opt.option_text}
                  checked={cc1 === opt.option_text}
                  onChange={() => onCC1Change(opt.option_text || "")}
                  className="mt-1 text-yellow-500 focus:ring-yellow-400 border-gray-300"
                />
                <span className="text-sm text-gray-700">{opt.option_text}</span>
              </label>
            ))}
          </div>
          {errors.cc1 && (
            <p className="text-red-500 text-sm mt-1">{errors.cc1}</p>
          )}
        </div>
      )}

      {/* Conditionally render CC2 & CC3 */}
      {showCC2_3 && (
        <>
          {/* CC2 */}
          {cc2Data && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CC2: {cc2Data.question_text}{" "}
                {cc2Data.is_required && <span className="text-red-500">*</span>}
              </label>
              <div className="space-y-2">
                {cc2Data.options?.map((opt) => (
                  <label key={opt.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="cc2"
                      value={opt.option_text}
                      checked={cc2 === opt.option_text}
                      onChange={() => onCC2Change(opt.option_text || "")}
                      className="text-yellow-500 focus:ring-yellow-400 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      {opt.option_text}
                    </span>
                  </label>
                ))}
              </div>
              {errors.cc2 && (
                <p className="text-red-500 text-sm mt-1">{errors.cc2}</p>
              )}
            </div>
          )}

          {/* CC3 */}
          {cc3Data && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CC3: {cc3Data.question_text}{" "}
                {cc3Data.is_required && <span className="text-red-500">*</span>}
              </label>
              <div className="space-y-2">
                {cc3Data.options?.map((opt) => (
                  <label key={opt.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="cc3"
                      value={opt.option_text}
                      checked={cc3 === opt.option_text}
                      onChange={() => onCC3Change(opt.option_text || "")}
                      className="text-yellow-500 focus:ring-yellow-400 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      {opt.option_text}
                    </span>
                  </label>
                ))}
              </div>
              {errors.cc3 && (
                <p className="text-red-500 text-sm mt-1">{errors.cc3}</p>
              )}
            </div>
          )}
        </>
      )}
    </fieldset>
  );
};
