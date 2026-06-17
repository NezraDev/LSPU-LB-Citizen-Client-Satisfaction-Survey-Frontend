import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOfficeById } from "../services/offices";
import type {
  Office,
  SurveyQuestion,
  SurveyResponse,
} from "../types/survey.type";
import SurveyForm from "../components/SurveyForm";

export default function SurveyPage() {
  const { qrToken } = useParams<{ qrToken: string }>();

  const [office, setOffice] = useState<Office | null>(null);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!qrToken) return;

    fetchOfficeById(qrToken)
      .then((res: SurveyResponse) => {
        setOffice(res.office);

        const sortedQuestions = res.questions.sort((a, b) => a.order - b.order);
        sortedQuestions.forEach((q) => {
          if (q.options && q.options.length > 0) {
            q.options.sort((a, b) => a.order - b.order);
          }
        });

        setQuestions(sortedQuestions);
      })
      .catch(() => setError("Failed to load survey"))
      .finally(() => setLoading(false));
  }, [qrToken]);

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
    <SurveyForm
      officeName={office.name}
      qrToken={qrToken!}
      questions={questions}
    />
  );
}
