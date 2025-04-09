const asyncHandler = require("express-async-handler"); // automaticlaly take serror to next() without need for try atch
const Verb = require("../models/Verb");
const bcrypt = require("bcrypt");

// @desc Get all verbs
// @route GET /verbs
// @access Private
const getAllVerbs = asyncHandler(async (req, res) => {
  const verbs = await Verb.find().select().lean();
  if (!verbs?.length) {
    return res.status(400).json({ message: "No verbs found" });
  }
  res.json(verbs);
});

// @desc Create new verbs
// @route POST  /verbs
// @access Private
const createNewVerb = asyncHandler(async (req, res) => {
  const {
    infinitive,
    present,
    preterite,
    imperfect,
    future,
    conditional,
    irregular,
  } = req.body;

  // Confirm data
  if (
    !infinitive ||
    !present ||
    !preterite ||
    !imperfect ||
    !future ||
    !conditional ||
    !irregular
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate
  const duplicate = await Verb.findOne({ infinitive }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate verb" });
  }

  const verbObject = {
    infinitive,
    present,
    preterite,
    imperfect,
    future,
    conditional,
    irregular,
  };

  // Create and store new verb
  const verb = await Verb.create(verbObject);

  if (verb) {
    res.status(201).json({ message: `New verb ${infinitive} created` });
  } else {
    res.status(400).json({ message: "Invalid verb data received" });
  }
});

// @desc Update a verb
// @route PATCH /verbs
// @access Private
const updateVerb = asyncHandler(async (req, res, next) => {
  const {
    id,
    infinitive,
    present,
    preterite,
    imperfect,
    future,
    conditional,
    irregular,
  } = req.body;

  // Confirm data
  if (!id || !infinitive) {
    return res
      .status(400)
      .json({ message: "ID and infinitive are required fields" });
  }

  // Does the verb exist to update?
  var verb = await Verb.findById(id).exec();

  if (!verb) {
    return res.status(400).json({ message: "Verb not found" });
  }

  // Check for duplicate
  const duplicate = await Verb.findOne({ infinitive }).lean().exec();

  // Allow updates to the original verb
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate verb" });
  }

  verb.infinitive = infinitive;
  if (present) verb.present = present;
  if (preterite) verb.preterite = preterite;
  if (imperfect) verb.imperfect = imperfect;
  if (future) verb.future = future;
  if (conditional) verb.conditional = conditional;
  if (irregular) verb.irregular = irregular;

  const updatedVerb = await verb.save();

  res.json({ message: `${updatedVerb.infinitive} updated` });
});

// @desc Delete a verb
// @route DELETE /verbs
// @access Private
const deleteVerb = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Verb ID Required" });
  }

  // Does the verb exist to delete?
  const verb = await Verb.findById(id).exec();

  if (!verb) {
    return res.status(400).json({ message: "Verb not found" });
  }

  const result = await verb.deleteOne();

  const reply = `Verb ${verb.infinitive} with ID ${verb._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllVerbs,
  createNewVerb,
  updateVerb,
  deleteVerb,
};
