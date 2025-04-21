const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    score: {
      type: Number,
      required: true,
    },
    numQuestions: {
      type: Number,
      required: true,
    },
    questions: [
      {
        pronoun: String,
        infinitive: String,
        tense: String,
        userAnswer: String,
        correctAnswer: String,
        correct: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Score", scoreSchema);
