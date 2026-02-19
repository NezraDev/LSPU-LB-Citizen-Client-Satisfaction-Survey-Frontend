interface CitizenCharterProps {
  cc1: string;
  cc2: string;
  cc3: string;
  onCC1Change: (value: string) => void;
  onCC2Change: (value: string) => void;
  onCC3Change: (value: string) => void;
}

const CC1_OPTIONS = [
  "I know what a CC is and I saw this office’s CC.",
  "I know what a CC is but I did NOT see this office’s CC.",
  "I learned of the CC only when I saw this office’s CC.",
  "I do not know what a CC is and I did not see one in this office. ",
];

const CC2_OPTIONS = [
  "Easy to see",
  "Somewhat easy to see",
  "Difficult to see",
  "Not visible at all",
  "N/A",
];
const CC3_OPTIONS = [
  "Helped very much",
  "Somewhat helped",
  "Did not help",
  "N/A",
];

export default function CitizenCharter({
  cc1,
  cc2,
  cc3,
  onCC1Change,
  onCC2Change,
  onCC3Change,
}: CitizenCharterProps) {
  const showCC2_3 = cc1 && cc1 !== CC1_OPTIONS[3];

  return (
    <fieldset className="border border-gray-300 rounded-md p-4">
      <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
        CITIZEN'S CHARTER (CC) QUESTIONS
      </legend>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CC1: Which of the following best describes your awareness of a CC?
        </label>
        <div className="space-y-2">
          {CC1_OPTIONS.map((option) => (
            <label key={option} className="flex items-start space-x-2">
              <input
                type="radio"
                value={option}
                checked={cc1 === option}
                onChange={() => onCC1Change(option)}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {showCC2_3 && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CC2: If aware of CC, would you say that the CC of this office was
              ...?
            </label>
            <div className="space-y-2">
              {CC2_OPTIONS.map((opt) => (
                <label key={opt} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={opt}
                    checked={cc2 === opt}
                    onChange={() => onCC2Change(opt)}
                  />
                  <span className="text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CC3: If aware of CC, how much did the CC help you in your
              transaction?
            </label>
            <div className="space-y-2">
              {CC3_OPTIONS.map((opt) => (
                <label key={opt} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={opt}
                    checked={cc3 === opt}
                    onChange={() => onCC3Change(opt)}
                  />
                  <span className="text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </fieldset>
  );
}
