const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: String,
  prior: Number,
  symptoms: [{ symptom: String, likelihood: Number }],
});

module.exports = mongoose.model("Disease", diseaseSchema);
