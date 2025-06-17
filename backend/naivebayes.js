function diagnoseNaiveBayes(inputSymptoms, diseases) {
  const results = diseases.map((disease) => {
    let probability = disease.prior;
    inputSymptoms.forEach((symptom) => {
      const found = disease.symptoms.find((s) => s.symptom === symptom);
      probability *= found ? found.likelihood : 0.01;
    });
    return { name: disease.name, probability };
  });

  const total = results.reduce((acc, r) => acc + r.probability, 0);
  return results.map((r) => ({
    name: r.name,
    probability: ((r.probability / total) * 100).toFixed(2),
  }));
}

module.exports = diagnoseNaiveBayes;