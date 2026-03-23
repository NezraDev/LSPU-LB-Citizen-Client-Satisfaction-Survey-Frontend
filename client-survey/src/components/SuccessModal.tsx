import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message = "Thank you. Your response has been recorded.",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className="bg-white w-[450px] max-w-[90%] rounded-2xl shadow-xl p-8 text-center">
        <h2
          id="success-modal-title"
          className="text-3xl font-bold text-green-600 mb-4"
        >
          Successfully Submitted!
        </h2>

        <p className="text-gray-600 text-lg mb-8">{message}</p>

        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;