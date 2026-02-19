import React from "react";

interface SubmitButtonProps {
  submitting: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ submitting }) => {
  return (
    <div className="flex justify-center pt-4">
      <button
        type="submit"
        disabled={submitting}
        className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-3 sm:py-2 px-6 sm:px-8 rounded-md transition w-full sm:w-auto text-sm sm:text-base disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};
