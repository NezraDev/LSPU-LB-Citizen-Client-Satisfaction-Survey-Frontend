import { useSurveyForm } from "../hooks/useSurveyForm";
import type { Office } from "../types/survey.type";
import SurveyHeader from "./SurveyHeader";
import TicketInfo from "./TicketInfo";
import PersonalInfo from "./PersonalInfo";
import CitizenCharter from "./CitizenCharter";
import ServicesAttained from "./ServicesAttained";
import ServiceQuality from "./ServiceQuality";
import Comments from "./Comments";
import SubmitButton from "./SubmitButton";

interface SurveyFormProps {
  office: Office;
}

export default function SurveyForm({ office }: SurveyFormProps) {
  const {
    formData,
    submitting,
    submitError,
    handleChange,
    handlePersonalInfoChange,
    handleQualityChange,
    toggleService,
    handleSubmit,
  } = useSurveyForm(office);

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <SurveyHeader officeName={office.name} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4 sm:space-y-6"
        >
          <TicketInfo
            ticketCode={formData.ticketCode}
            date={formData.date}
            timeIn={formData.timeIn}
            timeOut={formData.timeOut}
            onTicketCodeChange={(val) => handleChange("ticketCode", val)}
          />
          <PersonalInfo
            data={formData.personalInfo}
            onChange={handlePersonalInfoChange}
          />
          <CitizenCharter
            cc1={formData.cc1}
            cc2={formData.cc2 || ""}
            cc3={formData.cc3 || ""}
            onCC1Change={(val) => handleChange("cc1", val)}
            onCC2Change={(val) => handleChange("cc2", val)}
            onCC3Change={(val) => handleChange("cc3", val)}
          />
          <ServicesAttained
            services={office.services}
            selectedServices={formData.services}
            onToggle={toggleService}
          />
          <ServiceQuality
            data={formData.quality}
            onChange={handleQualityChange}
          />
          <Comments
            value={formData.comments || ""}
            onChange={(val) => handleChange("comments", val)}
          />
          {submitError && (
            <div className="text-red-600 text-sm text-center">
              {submitError}
            </div>
          )}
          <SubmitButton submitting={submitting} />
          {/* Modal Logic*/}
        </form>
      </div>
    </div>
  );
}
