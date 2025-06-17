"use client";

import { useState, useEffect } from "react";
import DiseaseResult from "../components/DiseaseResult";

export default function Home() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [submittedSymptoms, setSubmittedSymptoms] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/symptoms")
      .then((res) => res.json())
      .then((data) => setSymptoms(data))
      .catch((err) => console.error("Error fetching symptoms:", err));
  }, []);

  const handleChange = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const diagnose = async () => {
    const res = await fetch("http://localhost:5000/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: selectedSymptoms }),
    });
    const data = await res.json();
    setSubmittedSymptoms(selectedSymptoms); // simpan sebelum reset
    setResults(data);
    setSelectedSymptoms([]); // reset checkbox
  };

  return (
    <main className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">Diagnosis Penyakit</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {symptoms.map((s) => (
          <label key={s} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedSymptoms.includes(s)}
              onChange={() => handleChange(s)}
              className="accent-blue-500"
            />
            <span>{s}</span>
          </label>
        ))}
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white mb-4"
        onClick={diagnose}
      >
        Diagnosa
      </button>

      {submittedSymptoms.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Gejala yang Dipilih:</h2>
          <ul className="list-disc list-inside text-gray-200">
            {submittedSymptoms.map((symptom, idx) => (
              <li key={idx}>{symptom}</li>
            ))}
          </ul>
        </div>
      )}

      <DiseaseResult results={results} />
    </main>
  );
}
