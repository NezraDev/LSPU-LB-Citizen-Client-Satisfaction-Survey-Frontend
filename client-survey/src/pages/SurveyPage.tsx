import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchOfficeById } from "../services/offices";
import SurveyForm from "../components/SurveyForm";
import type { Office } from "../types/survey.type";

export default function SurveyPage() {
  const { officeId } = useParams<{ officeId: string }>();
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!officeId) return;
    setLoading(true);
    fetchOfficeById(officeId)
      .then(setOffice)
      .catch(() => setError("Failed to load office data"))
      .finally(() => setLoading(false));
  }, [officeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg">Loading office information...</p>
      </div>
    );
  }

  if (error || !office) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Office not found
          </h1>
          <p>
            {error || "Please check the QR code or contact the administrator."}
          </p>
        </div>
      </div>
    );
  }

  return <SurveyForm office={office} />;
}
