import React, { useState } from "react";
import type { SurveyQuestion, Service } from "../types/survey.type";
import { useDynamicSurveyForm } from "../hooks/useDynamicSurveyForm";
import { SubmitButton } from "./SubmitButton";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

interface DynamicSurveyProps {
  officeName: string;
  qrToken: string;
  questions: SurveyQuestion[];
  services: Service[];
  classification: string;
}

export const DynamicSurvey: React.FC<DynamicSurveyProps> = ({
  officeName,
  qrToken,
  questions,
  services,
  classification,
}) => {
  const {
    answers,
    errors,
    submitting,
    submitError,
    updateAnswer,
    handleSubmit,
    isErrorOpen,
    setIsErrorOpen,
    errorMessage,
    isSuccessOpen,
    setIsSuccessOpen,
  } = useDynamicSurveyForm(questions, services, qrToken, classification);

  // Group questions by section_name and order
  const grouped = questions.reduce(
    (acc, q) => {
      const section = q.section_name || "Other";
      if (!acc[section]) acc[section] = [];
      acc[section].push(q);
      return acc;
    },
    {} as Record<string, SurveyQuestion[]>,
  );

  // Sort sections by the minimum order in each group (optional, keep order)
  const sortedSections = Object.entries(grouped).sort((a, b) => {
    const minA = Math.min(...a[1].map((q) => q.order));
    const minB = Math.min(...b[1].map((q) => q.order));
    return minA - minB;
  });

  const renderQuestion = (question: SurveyQuestion) => {
    const value = answers[question.id] ?? "";
    const error = errors[question.id];
    const required = question.is_required;

    switch (question.question_type) {
      case "radio":
      case "multiple_choice":
        return (
          <div className="space-y-2">
            {question.options.map((opt) => (
              <label key={opt.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={opt.option_text || opt.name || ""}
                  checked={value === (opt.option_text || opt.name)}
                  onChange={() =>
                    updateAnswer(question.id, opt.option_text || opt.name || "")
                  }
                />
                <span>{opt.option_text || opt.name}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {question.options.map((opt) => {
              const optValue = opt.option_text || opt.name || "";
              const checked = Array.isArray(value) && value.includes(optValue);
              return (
                <label key={opt.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      let newValue = Array.isArray(value) ? [...value] : [];
                      if (e.target.checked) {
                        newValue.push(optValue);
                      } else {
                        newValue = newValue.filter((v) => v !== optValue);
                      }
                      updateAnswer(question.id, newValue);
                    }}
                  />
                  <span>{optValue}</span>
                </label>
              );
            })}
          </div>
        );

      case "textarea":
        return (
          <textarea
            rows={4}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => updateAnswer(question.id, e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        );

      default: // text, number, etc.
        return (
          <input
            type={question.question_type === "number" ? "number" : "text"}
            value={
              typeof value === "string" || typeof value === "number"
                ? value
                : ""
            }
            onChange={(e) =>
              updateAnswer(
                question.id,
                question.question_type === "number"
                  ? Number(e.target.value)
                  : e.target.value,
              )
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-600 border-b-2 border-yellow-400 pb-2">
            {officeName}
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
            <span className="font-bold">HELP US SERVE YOU BETTER!</span> This
            short Client Satisfaction Measurement (CSM) survey aims to track the
            customer experience of government offices.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {sortedSections.map(([sectionName, sectionQuestions]) => (
            <fieldset
              key={sectionName}
              className="border border-gray-300 rounded-md p-4"
            >
              <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
                {sectionName.toUpperCase()}
              </legend>
              {sectionQuestions
                .sort((a, b) => a.order - b.order)
                .map((question) => (
                  <div key={question.id} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {question.question_text}
                      {question.is_required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    {renderQuestion(question)}
                    {errors[question.id] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[question.id]}
                      </p>
                    )}
                  </div>
                ))}
            </fieldset>
          ))}

          {submitError && (
            <div className="text-red-600 text-sm text-center">
              {submitError}
            </div>
          )}
          <SubmitButton submitting={submitting} />
        </form>

        <ErrorModal
          isOpen={isErrorOpen}
          message={errorMessage}
          onClose={() => setIsErrorOpen(false)}
        />
        <SuccessModal
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
        />
      </div>
    </div>
  );
};
