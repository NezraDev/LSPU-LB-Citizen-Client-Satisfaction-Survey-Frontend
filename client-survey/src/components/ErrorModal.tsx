import React from "react";

interface ErrorModalProps {
  isOpen: boolean;
  message: string;     
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="bg-white w-[400px] rounded-xl shadow-xl p-8 text-center">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
            <span className="text-red-500 text-3xl font-bold">✕</span>
          </div>
        </div>

        <p className="text-gray-700 mb-6">{message}</p>

        <button
          onClick={onClose}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-md w-full transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;