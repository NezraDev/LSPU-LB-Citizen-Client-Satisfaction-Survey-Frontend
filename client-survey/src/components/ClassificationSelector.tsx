import React, { useEffect, useState } from "react";
import {
  fetchClassifications,
  type Classification,
} from "../services/classification";

interface ClassificationSelectorProps {
  onSelect: (classification: string) => void;
}

export const ClassificationSelector: React.FC<ClassificationSelectorProps> = ({
  onSelect,
}) => {
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClassifications()
      .then(setClassifications)
      .catch(() => setError("Failed to load classification options"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) onSelect(selected);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          Please select your classification
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2 mb-6">
            {classifications.map((c) => (
              <label key={c.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={c.label}
                  checked={selected === c.label}
                  onChange={() => setSelected(c.label)}
                />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            disabled={!selected}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
