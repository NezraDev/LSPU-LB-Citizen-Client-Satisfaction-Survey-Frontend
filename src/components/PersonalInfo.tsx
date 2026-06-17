import React, { useMemo } from "react";
import type {
  PersonalInfo as PersonalInfoType,
  SurveyQuestion,
} from "../types/survey.type";

interface PersonalInfoProps {
  data: PersonalInfoType;
  questions: SurveyQuestion[];
  onChange: <K extends keyof PersonalInfoType>(
    field: K,
    value: PersonalInfoType[K],
  ) => void;
  errors?: Partial<Record<keyof PersonalInfoType, string>>;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  data,
  questions,
  onChange,
  errors = {},
}) => {
  const inputClasses =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50";
  const selectClasses =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50";
  const errorClass = "border-red-500";

  // Helper to safely find a question by a keyword in its text
  const getQuestion = useMemo(() => {
    return (keyword: string) =>
      questions.find((q) =>
        q.question_text.toLowerCase().includes(keyword.toLowerCase()),
      );
  }, [questions]);

  // Dynamically extract the full question objects
  const relationshipQ = getQuestion("relationship");
  const clientTypeQ = getQuestion("client type");
  const nameQ = getQuestion("name");
  const ageQ = getQuestion("age");
  const sexQ = getQuestion("sex"); // API uses "Sex" instead of "Gender"
  const civilStatusQ = getQuestion("civil status");
  const residenceQ = getQuestion("residence");
  const courseQ = getQuestion("course");
  const yearLevelQ = getQuestion("year level");
  const occupationQ = getQuestion("occupation");

  return (
    <fieldset className="border border-gray-300 rounded-md p-4">
      <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
        PERSONAL INFO
      </legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* NEW QUESTION: Relationship */}
        {relationshipQ && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              {relationshipQ.question_text}{" "}
              {relationshipQ.is_required && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <select
              value={data.relationship || ""}
              onChange={(e) => onChange("relationship", e.target.value as any)}
              className={`${selectClasses} ${errors.relationship ? errorClass : ""}`}
            >
              <option value="">Select Relationship</option>
              {relationshipQ.options?.map((opt) => (
                <option key={opt.id} value={opt.option_text}>
                  {opt.option_text}
                </option>
              ))}
            </select>
            {errors.relationship && (
              <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>
            )}
          </div>
        )}

        {/* Client Type */}
        {clientTypeQ && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              {clientTypeQ.question_text}{" "}
              {clientTypeQ.is_required && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <select
              value={data.clientType || ""}
              onChange={(e) => onChange("clientType", e.target.value as any)}
              className={`${selectClasses} ${errors.clientType ? errorClass : ""}`}
            >
              <option value="">Select Client Type</option>
              {clientTypeQ.options?.map((opt) => (
                <option key={opt.id} value={opt.option_text}>
                  {opt.option_text}
                </option>
              ))}
            </select>
            {errors.clientType && (
              <p className="text-red-500 text-sm mt-1">{errors.clientType}</p>
            )}
          </div>
        )}

        {/* Name */}
        {nameQ && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {nameQ.question_text}{" "}
              {nameQ.is_required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={data.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              className={inputClasses}
            />
          </div>
        )}

        {/* Age (Now a Dropdown based on JSON) */}
        {ageQ && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {ageQ.question_text}{" "}
              {ageQ.is_required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={data.age || ""}
              onChange={(e) => onChange("age", e.target.value as any)}
              className={`${selectClasses} ${errors.age ? errorClass : ""}`}
            >
              <option value="">Select Age Range</option>
              {ageQ.options?.map((opt) => (
                <option key={opt.id} value={opt.option_text}>
                  {opt.option_text}
                </option>
              ))}
            </select>
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>
        )}

        {/* Sex/Gender */}
        {sexQ && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {sexQ.question_text}{" "}
              {sexQ.is_required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={data.gender || ""}
              onChange={(e) => onChange("gender", e.target.value as any)}
              className={`${selectClasses} ${errors.gender ? errorClass : ""}`}
            >
              <option value="">Select Sex</option>
              {sexQ.options?.map((opt) => (
                <option key={opt.id} value={opt.option_text}>
                  {opt.option_text}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
        )}

        {/* Civil Status */}
        {civilStatusQ && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {civilStatusQ.question_text}{" "}
              {civilStatusQ.is_required && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <select
              value={data.civilStatus || ""}
              onChange={(e) => onChange("civilStatus", e.target.value as any)}
              className={`${selectClasses} ${errors.civilStatus ? errorClass : ""}`}
            >
              <option value="">Select Civil Status</option>
              {civilStatusQ.options?.map((opt) => (
                <option key={opt.id} value={opt.option_text}>
                  {opt.option_text}
                </option>
              ))}
            </select>
            {errors.civilStatus && (
              <p className="text-red-500 text-sm mt-1">{errors.civilStatus}</p>
            )}
          </div>
        )}

        {/* Residence (Now a Dropdown based on JSON) */}
        {residenceQ && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {residenceQ.question_text}{" "}
              {residenceQ.is_required && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <select
              value={data.residence || ""}
              onChange={(e) => onChange("residence", e.target.value)}
              className={`${selectClasses} ${errors.residence ? errorClass : ""}`}
            >
              <option value="">Select Region</option>
              {residenceQ.options?.map((opt) => (
                <option key={opt.id} value={opt.option_text}>
                  {opt.option_text}
                </option>
              ))}
            </select>
            {errors.residence && (
              <p className="text-red-500 text-sm mt-1">{errors.residence}</p>
            )}
          </div>
        )}

        {/* Course (Conditionally rendered if it exists in API) */}
        {courseQ && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {courseQ.question_text}{" "}
              {courseQ.is_required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={data.course || ""}
              onChange={(e) => onChange("course", e.target.value)}
              className={`${selectClasses} ${errors.course ? errorClass : ""}`}
            >
              <option value="">Select Course</option>
              {courseQ.options?.map((opt) => (
                <option key={opt.id} value={opt.option_text}>
                  {opt.option_text}
                </option>
              ))}
            </select>
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">{errors.course}</p>
            )}
          </div>
        )}

        {/* Year Level (Conditionally rendered if it exists in API) */}
        {yearLevelQ && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {yearLevelQ.question_text}{" "}
              {yearLevelQ.is_required && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <select
              value={data.yearLevel || ""}
              onChange={(e) => onChange("yearLevel", e.target.value)}
              className={`${selectClasses} ${errors.yearLevel ? errorClass : ""}`}
            >
              <option value="">Select Year Level</option>
              {yearLevelQ.options?.map((opt) => (
                <option key={opt.id} value={opt.option_text}>
                  {opt.option_text}
                </option>
              ))}
            </select>
            {errors.yearLevel && (
              <p className="text-red-500 text-sm mt-1">{errors.yearLevel}</p>
            )}
          </div>
        )}

        {/* Occupation (Conditionally rendered if it exists in API) */}
        {occupationQ && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {occupationQ.question_text}{" "}
              {occupationQ.is_required && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              type="text"
              value={data.occupation || ""}
              onChange={(e) => onChange("occupation", e.target.value)}
              className={`${inputClasses} ${errors.occupation ? errorClass : ""}`}
            />
            {errors.occupation && (
              <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
            )}
          </div>
        )}
      </div>
    </fieldset>
  );
};
