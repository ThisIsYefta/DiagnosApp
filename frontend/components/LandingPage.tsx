import { FiHeart, FiCheckCircle, FiZap, FiShield, FiArrowRight } from "react-icons/fi";

interface LandingPageProps {
  onStartDiagnosis: () => void;
}

export default function LandingPage({ onStartDiagnosis }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden p-6 text-center bg-slate-50">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
            <FiHeart className="w-10 h-10 text-sky-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 drop-shadow-sm">
            DiagnosApps
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mt-3">
            Sistem Cerdas untuk Analisis Kesehatan Awal
          </p>
        </div>

        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-12 leading-relaxed">
          Dapatkan wawasan awal mengenai kondisi kesehatan Anda berdasarkan gejala yang dialami.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {/* Card Fitur */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <FiCheckCircle className="w-6 h-6 text-sky-600" />
            </div>
            <h3 className="text-slate-800 font-semibold text-lg mb-2">Analisis Akurat</h3>
            <p className="text-slate-600 text-sm">Menggunakan model Bayes untuk memberikan analisis presisi.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <FiZap className="w-6 h-6 text-sky-600" />
            </div>
            <h3 className="text-slate-800 font-semibold text-lg mb-2">Hasil Cepat</h3>
            <p className="text-slate-600 text-sm">Dapatkan hasil analisis dalam hitungan detik.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <FiShield className="w-6 h-6 text-sky-600" />
            </div>
            <h3 className="text-slate-800 font-semibold text-lg mb-2">Privasi Terjaga</h3>
            <p className="text-slate-600 text-sm">Data kesehatan Anda aman dan tidak disimpan.</p>
          </div>
        </div>

        <button
          onClick={onStartDiagnosis}
          className="group flex items-center justify-center gap-3 px-8 py-4 bg-sky-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-sky-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300"
        >
          Mulai Diagnosis Sekarang
          <FiArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="text-slate-500 text-sm mt-8 max-w-md mx-auto">
          *Penting: Hasil analisis ini bukan pengganti diagnosis medis profesional.
        </p>
      </div>
    </div>
  );
}