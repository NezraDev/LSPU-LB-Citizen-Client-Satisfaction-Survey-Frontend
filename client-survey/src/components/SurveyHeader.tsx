import React from "react";

interface SurveyHeaderProps {
  officeName: string;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({ officeName }) => {
  return (
    <header className="mb-6 sm:mb-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-600 border-b-2 border-yellow-400 pb-2">
        {officeName}
      </h1>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
        <span className="font-bold">HELP US SERVE YOU BETTER!</span> This short
        Client Satisfaction Measurement (CSM) survey aims to track the customer
        experience of government offices. Your answers will enable this office
        to provide a better service.
      </p>
    </header>
  );
};
