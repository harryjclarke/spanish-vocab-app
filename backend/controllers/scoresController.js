const Score = require("../models/Score");
const asyncHandler = require("express-async-handler");

// @desc Get all user scores
// @route GET /users
// @access Private
const getUserScores = asyncHandler(async (req, res) => {
  // if (!req.params.userId) res.sendStatus(509);
  const scores = await Score.find().select().lean();
  if (!scores?.length) {
    return res.status(400).json({ message: "No scores found" });
  }
  res.json(scores);
});

// @desc Add user score
// @route POST /scores
// @access Private
const addScore = asyncHandler(async (req, res) => {
  const { user, score, numQuestions, questions } = req.body;

  if (!user || !numQuestions || !questions)
    return res.status(400).json({ message: "All fields are required" });

  const scoreCreate = await Score.create({
    user,
    score,
    numQuestions,
    questions,
  });

  if (scoreCreate) {
    res.status(201).json({ message: "Score added" });
  } else {
    res.status(400).json({ message: "Unable to add score" });
  }
});

module.exports = {
  getUserScores,
  addScore,
};
