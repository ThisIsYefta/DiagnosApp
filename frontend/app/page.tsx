// page.tsx
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
    setSubmittedSymptoms(selectedSymptoms);
    setResults(data);
    setSelectedSymptoms([]); // Kosongkan pilihan setelah submit
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Kontainer kartu utama, tambahkan text-gray-800 secara eksplisit di sini */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-6 md:p-8 relative z-10 text-gray-800">
        {/* Header - Sudah oke dengan warna hijau */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-green-700">Diagnosis Penyakit</h1>
          <div className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="" className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-green-600 font-bold text-lg md:text-xl">DiagnosApps</span>
          </div>
        </div>

        {/* Gejala Pilihan - Tambahkan text-gray-800 pada label untuk memastikan warnanya */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-4 mb-6 text-sm md:text-base">
          {symptoms.map((s) => (
            <label
              key={s}
              className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-gray-50 transition-colors select-none text-gray-800"
            >
              <input
                type="checkbox"
                checked={selectedSymptoms.includes(s)}
                onChange={() => handleChange(s)}
                className="appearance-none w-5 h-5 border-2 border-green-500 rounded-full cursor-pointer
                           checked:bg-green-600 checked:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                style={{ minWidth: '1.25rem', minHeight: '1.25rem' }}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>

        {/* Tombol Diagnosis - Teks sudah putih (text-white) yang cocok dengan latar hijau tombol */}
        <button
          className="bg-green-600 hover:bg-green-700 transition px-6 py-2 rounded-md text-white font-semibold text-lg mb-6 shadow-md"
          onClick={diagnose}
        >
          Diagnosis Penyakit
        </button>

        {/* List Gejala Terpilih - Sudah oke dengan text-gray-700 dan text-green-700 */}
        {submittedSymptoms.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-green-700 text-xl font-bold mb-3">
              Penyakit Yang di Keluhkan :
            </h2>
            <ol className="list-none text-base text-gray-700 space-y-1">
              {submittedSymptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="font-bold mr-2">{idx + 1}.</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Hasil Diagnosa - Sudah oke dengan text-gray-800 dan text-green-700, text-red-600 */}
        <DiseaseResult results={results} />
      </div>

      <img
        src="/images/doctor-boy.png"
        alt="Dokter laki-laki"
        className="absolute bottom-[-50px] right-[-50px] md:bottom-[-80px] md:right-[-80px] lg:bottom-[-100px] lg:right-[-100px] w-56 md:w-72 lg:w-96 h-auto opacity-80 pointer-events-none z-0"
      />
    </main>
  );
}