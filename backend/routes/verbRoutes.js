const express = require("express");
const router = express.Router();
const verbsController = require("../controllers/verbsController");

router
  .route("/")
  .get(verbsController.getAllVerbs)
  .post(verbsController.createNewVerb)
  .patch(verbsController.updateVerb)
  .delete(verbsController.deleteVerb);

module.exports = router;
