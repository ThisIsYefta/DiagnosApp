"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Impor komponen-komponen yang telah dipecah
import LandingPage from "@/components/LandingPage";
import DiagnosisPage from "@/components/DiagnosisPage";
import ResultsModal from "@/components/ResultsModal";

export default function Home() {
  // --- STATE MANAGEMENT ---
  // Semua state terpusat di sini
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [submittedSymptoms, setSubmittedSymptoms] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<{ name: string; probability: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Untuk loading diagnosis
  const [isSymptomsLoading, setIsSymptomsLoading] = useState(true); // Untuk loading gejala awal
  const [searchTerm, setSearchTerm] = useState("");
  const [showLanding, setShowLanding] = useState(true);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // --- DATA FETCHING & LOGIC ---
  useEffect(() => {
    setIsSymptomsLoading(true);
    fetch("http://localhost:5000/api/symptoms")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setSymptoms(data))
      .catch((err) => {
        console.error("Error fetching symptoms:", err);
        toast.error(
          "Gagal terhubung ke server. Pastikan backend berjalan dan coba muat ulang."
        );
      })
      .finally(() => {
        setIsSymptomsLoading(false);
      });
  }, []);

  const handleSymptomChange = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const diagnose = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Silakan pilih minimal satu gejala!");
      return;
    }
    setIsLoading(true);
    const loadingToast = toast.loading("Menganalisis gejala Anda...");

    try {
      const res = await fetch("http://localhost:5000/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, Message: ${errorText}`);
      }

      const data = await res.json();
      setSubmittedSymptoms(selectedSymptoms);
      setResults(data);
      setSelectedSymptoms([]);
      setSearchTerm("");
      setShowResultsModal(true);
      toast.success("Analisis berhasil!", { id: loadingToast });
    } catch (error) {
      console.error("Error during diagnosis:", error);
      toast.error(`Terjadi kesalahan. Coba lagi nanti.`, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
  };

  const startDiagnosis = () => {
    setShowLanding(false);
  };

  const backToHome = () => {
    setShowLanding(true);
    setShowResultsModal(false);
    // Reset semua state
    setSelectedSymptoms([]);
    setSubmittedSymptoms([]);
    setResults([]);
    setSearchTerm("");
  };

  const handleDiagnoseAgain = () => {
    setShowResultsModal(false);
    setSubmittedSymptoms([]);
    setResults([]);
  };

  // --- MAIN RENDER ---
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {showLanding ? (
        <LandingPage onStartDiagnosis={startDiagnosis} />
      ) : (
        <DiagnosisPage
          symptoms={symptoms}
          selectedSymptoms={selectedSymptoms}
          isLoading={isLoading}
          isSymptomsLoading={isSymptomsLoading}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSymptomChange={handleSymptomChange}
          onDiagnose={diagnose}
          onClearSelection={clearSelection}
          onBackToHome={backToHome}
        />
      )}
      {showResultsModal && (
        <ResultsModal
          results={results}
          submittedSymptoms={submittedSymptoms}
          onClose={() => setShowResultsModal(false)}
          onDiagnoseAgain={handleDiagnoseAgain}
          onBackToHome={backToHome}
        />
      )}
    </main>
  );
}