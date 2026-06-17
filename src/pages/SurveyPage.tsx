import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOfficeById } from "../services/offices";
import { fetchQuestions } from "../services/questions";
import { fetchServices } from "../services/services";
import { ClassificationSelector } from "../components/ClassificationSelector";
import { DynamicSurvey } from "../components/DynamicSurvey";
import type { Office, SurveyQuestion, Service } from "../types/survey.type";

export default function SurveyPage() {
  const { qrToken } = useParams<{ qrToken: string }>();
  const [classification, setClassification] = useState<string | null>(null);
  const [office, setOffice] = useState<Office | null>(null);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!qrToken) return;
    fetchOfficeById(qrToken)
      .then(setOffice)
      .catch(() => setError("Failed to load office data"));
  }, [qrToken]);

  const handleClassificationSelect = async (selected: string) => {
    setClassification(selected);
    setLoading(true);
    try {
      const [fetchedQuestions, fetchedServices] = await Promise.all([
        fetchQuestions(),
        fetchServices(),
      ]);
      setQuestions(fetchedQuestions);
      setServices(fetchedServices);
    } catch (err) {
      setError("Failed to load survey content");
    } finally {
      setLoading(false);
    }
  };

  if (!classification) {
    return <ClassificationSelector onSelect={handleClassificationSelect} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading survey...
      </div>
    );
  }

  if (error || !office || !questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "Unable to load survey. Please try again."}
      </div>
    );
  }

  return (
    <DynamicSurvey
      officeName={office.name}
      qrToken={qrToken!}
      questions={questions}
      services={services}
      classification={classification}
    />
  );
}
