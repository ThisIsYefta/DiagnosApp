import { FiChevronLeft, FiSearch, FiX, FiList, FiCheck, FiLoader, FiCheckCircle } from 'react-icons/fi';
import React from 'react';

// Definisikan props yang diterima komponen ini
interface DiagnosisPageProps {
  symptoms: string[];
  selectedSymptoms: string[];
  isLoading: boolean;
  isSymptomsLoading: boolean;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSymptomChange: (symptom: string) => void;
  onDiagnose: () => void;
  onClearSelection: () => void;
  onBackToHome: () => void;
}

export default function DiagnosisPage({
  symptoms,
  selectedSymptoms,
  isLoading,
  isSymptomsLoading,
  searchTerm,
  onSearchChange,
  onSymptomChange,
  onDiagnose,
  onClearSelection,
  onBackToHome,
}: DiagnosisPageProps) {
  const filteredSymptoms = symptoms.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-screen">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 p-6 md:p-8 text-slate-800 w-full">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button onClick={onBackToHome} className="p-2 mr-2 hover:bg-slate-100 rounded-full transition-colors">
            <FiChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Mulai Diagnosis</h1>
            <p className="text-slate-600 text-base mt-1">Pilih semua gejala yang Anda rasakan.</p>
          </div>
        </div>

        {/* Search and Selected Symptoms */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari gejala (misal: Demam, Batuk...)"
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500"
            />
          </div>
          
          {/* === BAGIAN YANG DIPERBAIKI: MENGHILANGKAN LAYOUT SHIFT === */}
          <div className="min-h-[92px] bg-slate-50 border rounded-xl p-4 transition-all duration-300 flex flex-col justify-center">
            {selectedSymptoms.length > 0 ? (
              <div className="animate-fadeIn">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sky-800 font-semibold">Gejala terpilih ({selectedSymptoms.length}):</p>
                  <button onClick={onClearSelection} className="text-sm text-sky-600 hover:text-sky-800 font-medium flex items-center gap-1">
                    <FiX /> Hapus Semua
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <span key={symptom} className="inline-flex items-center gap-2 bg-sky-200 text-sky-800 px-3 py-1 rounded-full text-sm font-medium">
                      {symptom}
                      <button onClick={() => onSymptomChange(symptom)} className="hover:bg-sky-300 rounded-full p-0.5">
                        <FiX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-slate-400">Gejala yang Anda pilih akan muncul di sini.</p>
            )}
          </div>
        </div>

        {/* Symptoms List */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FiList className="w-6 h-6 text-sky-600" /> Daftar Gejala
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[40vh] overflow-y-auto pr-2">
            {isSymptomsLoading ? (
              Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="h-14 bg-slate-200 rounded-xl animate-pulse"></div>
              ))
            ) : (
              filteredSymptoms.map((symptom) => (
                <label key={symptom} onClick={() => onSymptomChange(symptom)} className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl border-2 transition-all ${selectedSymptoms.includes(symptom) ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-300"}`}>
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${selectedSymptoms.includes(symptom) ? "border-sky-500 bg-sky-500" : "border-slate-400"}`}>
                    {selectedSymptoms.includes(symptom) && <FiCheck className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm font-medium ${selectedSymptoms.includes(symptom) ? "text-sky-900" : "text-slate-700"}`}>{symptom}</span>
                </label>
              ))
            )}
          </div>
          {!isSymptomsLoading && filteredSymptoms.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p>Gejala "{searchTerm}" tidak ditemukan.</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button onClick={onDiagnose} disabled={isLoading || selectedSymptoms.length === 0} className="px-8 py-4 w-full md:w-auto rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:cursor-not-allowed bg-sky-600 text-white hover:bg-sky-700">
            {isLoading ? (
              <><FiLoader className="animate-spin h-5 w-5" /> Menganalisis...</>
            ) : (
              <><FiCheckCircle className="w-6 h-6" /> Dapatkan Analisis</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}