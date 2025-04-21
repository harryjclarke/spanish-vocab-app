const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scoresController");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT); // applices this middleware to all routes in this file

router
  .route("/")
  .get(verifyJWT, scoresController.getUserScores)
  .post(verifyJWT, scoresController.addScore);

module.exports = router;
