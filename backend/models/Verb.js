const mongoose = require("mongoose");

const verbSchema = new mongoose.Schema(
  {
    infinitive: String,
    present: [{ conjugation: String, pronoun: String }],
    preterite: [{ conjugation: String, pronoun: String }],
    imperfect: [{ conjugation: String, pronoun: String }],
    future: [{ conjugation: String, pronoun: String }],
    conditional: [{ conjugation: String, pronoun: String }],
    irregular: {
      present: Boolean,
      preterite: Boolean,
      imperfect: Boolean,
      future: Boolean,
      conditional: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verb", verbSchema);
