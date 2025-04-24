const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scoresController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/").post(verifyJWT, scoresController.addScore);

router.route("/").get(scoresController.getUserScores);

module.exports = router;
