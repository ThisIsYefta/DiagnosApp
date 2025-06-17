export default function DiseaseResult({ results }: { results: any[] }) {
  if (!results.length) return null;

  const topResults = [...results]
    .sort((a, b) => Number(b.probability) - Number(a.probability))
    .slice(0, 3);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Hasil Diagnosa</h2>
      <ul>
        {topResults.map((r) => (
          <li key={r.name}>
            {r.name}: {Number(r.probability).toFixed(2)}%
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-gray-600">
        Silakan konsultasi lebih lanjut dengan dokter untuk diagnosis pasti.
      </p>
    </div>
  );
}
