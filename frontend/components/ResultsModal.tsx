import { useState } from 'react';
import DiseaseResult from './DiseaseResult';
import { FiX, FiActivity, FiChevronDown } from 'react-icons/fi';

interface ResultsModalProps {
  results: { name: string; probability: number }[];
  submittedSymptoms: string[];
  onClose: () => void;
  onDiagnoseAgain: () => void;
  onBackToHome: () => void;
}

export default function ResultsModal({
  results,
  submittedSymptoms,
  onClose,
  onDiagnoseAgain,
  onBackToHome,
}: ResultsModalProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden border">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <div className="flex items-center gap-3">
            <FiActivity className="w-7 h-7 text-sky-600" />
            <h2 className="text-2xl font-bold text-slate-900">Hasil Analisis</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <FiX className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <DiseaseResult results={results} />

          {/* === BAGIAN YANG DIPERBAIKI: ACCORDION KUSTOM === */}
          <div className="mt-6 bg-slate-50 rounded-lg border overflow-hidden">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              <span>Lihat Gejala yang Dilaporkan ({submittedSymptoms.length})</span>
              <FiChevronDown
                className={`transform transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            <div
              className={`transition-all duration-500 ease-in-out grid ${
                isDetailsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t p-4">
                  <ol className="list-decimal list-inside text-slate-600 space-y-1">
                    {submittedSymptoms.map((symptom, idx) => (
                      <li key={idx}>{symptom}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-50/80 backdrop-blur-sm p-4 border-t mt-auto">
          <div className="flex flex-col sm:flex-row gap-3 justify-end items-center">
            <button
              onClick={onBackToHome}
              className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition font-medium w-full sm:w-auto"
            >
              Kembali ke Beranda
            </button>
            <button
              onClick={onDiagnoseAgain}
              className="px-5 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-semibold shadow-sm hover:shadow-md w-full sm:w-auto"
            >
              Diagnosis Ulang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}