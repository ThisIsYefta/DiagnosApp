const express = require("express");
const router = express.Router();
const dataset = require("../data/dataset.json");

router.post("/", (req, res) => {
  const selectedSymptoms = req.body.symptoms;
  const results = {};

  // Hitung prior probability
  let total = 0;
  for (let disease in dataset) {
    total += dataset[disease].prior;
  }

  for (let disease in dataset) {
    let prob = dataset[disease].prior / total;

    selectedSymptoms.forEach((symptom) => {
      const likelihood = dataset[disease].symptoms[symptom] || 0.01; 
      prob *= likelihood;
    });

    results[disease] = prob;
  }

  // Normalisasi
  const sum = Object.values(results).reduce((a, b) => a + b, 0);
  for (let key in results) {
    results[key] = ((results[key] / sum) * 100).toFixed(2);
  }

  res.json(results);
});

module.exports = router;
