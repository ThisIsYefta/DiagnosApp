const express = require("express");
const router = express.Router();
const Disease = require("../models/diseaseModel");

router.get("/", async (req, res) => {
  try {
    const diseases = await Disease.find({});
    const allSymptoms = new Set();

    diseases.forEach(d => {
      d.symptoms.forEach(s => allSymptoms.add(s.symptom));
    });

    res.json(Array.from(allSymptoms).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
