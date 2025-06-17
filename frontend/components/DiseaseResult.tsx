// DiseaseResult.tsx
export default function DiseaseResult({ results }: { results: any[] }) {
  if (!results.length) return null;

  const topResults = [...results]
    .sort((a, b) => Number(b.probability) - Number(a.probability))
    .slice(0, 3);

  return (
    // Tambahkan text-gray-800 secara eksplisit di sini untuk memastikan warna teks keseluruhan
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md text-gray-800 mb-6">
      {/* H2 sudah text-green-700 */}
      <h2 className="text-xl md:text-2xl font-bold mb-3 text-green-700">
        Hasil Diagnosa
      </h2>
      <ul className="mb-4 text-base md:text-lg space-y-1">
        {topResults.map((r, idx) => {
          const trueProbability = Number(r.probability);
          const formattedPercentage = trueProbability.toFixed(2);
          // const formattedPercentage = trueProbability.toFixed(2).replace('.', ','); // Untuk format Indonesia

          return (
            <li key={idx}>
              <span className="font-semibold">{r.name}</span>{" "}
              {/* Span ini sudah text-gray-700 */}
              <span className="font-medium text-gray-700">{formattedPercentage}%</span>
            </li>
          );
        })}
      </ul>
      {/* Paragraf ini sudah text-red-600 */}
      <p className="text-red-600 font-semibold text-sm md:text-base">
        Segera datanglah dan konsultasikan kepada dokter di Rumah Sakit terdekat kamu yaa!!!
      </p>
    </div>
  );
}