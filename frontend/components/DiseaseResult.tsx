import React from 'react';

interface DiseaseResultProps {
  results: { name: string; probability: number }[];
}

export default function DiseaseResult({ results }: DiseaseResultProps) {
  if (!results || results.length === 0) {
    return (
      <div className="text-center p-8 bg-slate-100 rounded-lg">
        <p className="text-slate-600">Tidak ada hasil diagnosis yang dapat ditampilkan.</p>
      </div>
    );
  }
  
  const topResults = [...results]
    .sort((a, b) => Number(b.probability) - Number(a.probability))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <p className="text-slate-600 text-center">
        Berdasarkan gejala Anda, berikut adalah kemungkinan kondisi teratas.
      </p>
      <ul className="space-y-5">
        {topResults.map((r, idx) => {
          const percentage = Number(r.probability) || 0;
          const isTopResult = idx === 0;

          return (
            <li key={idx}>
              <div className="flex justify-between items-center mb-1.5">
                <span className={`font-bold text-lg ${isTopResult ? 'text-sky-700' : 'text-slate-800'}`}>
                  {r.name || "Tidak Dikenal"}
                </span>
                <span className={`font-semibold text-base ${isTopResult ? 'text-sky-600' : 'text-slate-600'}`}>
                  {percentage.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${isTopResult ? 'bg-sky-500' : 'bg-slate-400'}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
        <p className="font-bold">Penting untuk Diingat</p>
        <p>
          Hasil ini bersifat informatif dan bukan diagnosis medis final. Segera konsultasikan dengan dokter untuk kepastian.
        </p>
      </div>
    </div>
  );
}