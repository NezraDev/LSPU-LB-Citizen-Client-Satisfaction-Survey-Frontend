import type {
  PersonalInfo as PersonalInfoType,
  ClientType,
} from "../types/survey.type";

interface PersonalInfoProps {
  data: PersonalInfoType;
  onChange: <K extends keyof PersonalInfoType>(
    field: K,
    value: PersonalInfoType[K],
  ) => void;
}

const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;
const CIVIL_STATUS_OPTIONS = [
  "Single",
  "Married",
  "Divorced",
  "Separated",
  "Widowed",
] as const;
const CLIENT_TYPE_OPTIONS: ClientType[] = [
  "General Public",
  "Student",
  "Government Employee",
];
const COURSE_OPTIONS = [
  "Bachelor of Science in Criminology",
  "Bachelor of Science in TLED (BTLED)",
  "Bachelor of Science in Physical Education (BPED)",
  "Bachelor of Science in TVET Education (BTVTED)",
  "Bachelor of Science in Elementary Education (BEED)",
  "Bachelor of Science in Mathematics (MATH)",
  "Bachelor of Science in Filipino (FILIPINO)",
  "Bachelor of Science in English (ENGLISH)",
  "Bachelor of Science in Food Technology",
  "Bachelor of Science in Nutrition and Dietetics",
  "Bachelor of Science in Business Administration (BSBA)",
  "Bachelor of Science in Accountancy (BSA)",
  "Bachelor of Science in Computer Science",
  "Bachelor of Science in Information Technology",
  "Bachelor of Science in Psychology",
  "Bachelor of Science in Fisheries",
  "Bachelor of Science in Hospitality Management (BSHM)",
  "Bachelor of Science in Tourism Management (BSTM)",
];
const YEAR_LEVEL_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  const inputClasses =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50";
  const selectClasses =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50";

  return (
    <fieldset className="border border-gray-300 rounded-md p-4">
      <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
        PERSONAL INFO
      </legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Client Type
          </label>
          <select
            value={data.clientType}
            onChange={(e) =>
              onChange("clientType", e.target.value as ClientType)
            }
            className={selectClasses}
          >
            <option value="">Select Client Type</option>
            {CLIENT_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name (Optional)
          </label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={data.age || ""}
            onChange={(e) => onChange("age", parseInt(e.target.value) || 0)}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            value={data.gender}
            onChange={(e) => onChange("gender", e.target.value as any)}
            className={selectClasses}
          >
            <option value="">Select Gender</option>
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Civil Status
          </label>
          <select
            value={data.civilStatus}
            onChange={(e) => onChange("civilStatus", e.target.value as any)}
            className={selectClasses}
          >
            <option value="">Select Civil Status</option>
            {CIVIL_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Residence
          </label>
          <input
            type="text"
            value={data.residence}
            onChange={(e) => onChange("residence", e.target.value)}
            className={inputClasses}
          />
        </div>

        {data.clientType === "Student" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <select
                value={data.course || ""}
                onChange={(e) => onChange("course", e.target.value)}
                className={selectClasses}
              >
                <option value="">Select Course</option>
                {COURSE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year Level
              </label>
              <select
                value={data.yearLevel || ""}
                onChange={(e) => onChange("yearLevel", e.target.value)}
                className={selectClasses}
              >
                <option value="">Select Year Level</option>
                {YEAR_LEVEL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {(data.clientType === "General Public" ||
          data.clientType === "Government Employee") && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <input
              type="text"
              value={data.occupation || ""}
              onChange={(e) => onChange("occupation", e.target.value)}
              className={inputClasses}
            />
          </div>
        )}
      </div>
    </fieldset>
  );
}
