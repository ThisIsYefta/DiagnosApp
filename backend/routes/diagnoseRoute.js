const express = require("express");
const Disease = require("../models/diseaseModel");
const diagnoseNaiveBayes = require("../naivebayes");
const router = express.Router();

router.post("/", async (req, res) => {
  const { symptoms } = req.body;
  const diseases = await Disease.find();
  const result = diagnoseNaiveBayes(symptoms, diseases);
  res.json(result);
});

module.exports = router;