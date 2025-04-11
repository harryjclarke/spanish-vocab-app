const mongoose = require("mongoose");

const verbSchema = new mongoose.Schema({
  infinitive: String,
  definition: String,
  present: [{ conjugation: String, pronoun: String }],
  preterite: [{ conjugation: String, pronoun: String }],
  imperfect: [{ conjugation: String, pronoun: String }],
  future: [{ conjugation: String, pronoun: String }],
  conditional: [{ conjugation: String, pronoun: String }],
  irregular: Boolean,
});

module.exports = mongoose.model("Verb", verbSchema);
