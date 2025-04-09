const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "Basic",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  preferences: {},
});

module.exports = mongoose.model("User", userSchema);
