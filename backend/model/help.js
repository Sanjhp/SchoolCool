const mongoose = require("mongoose");

// Define the Help Schema
const helpSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  class: {
    type: String,
  },
  reply: {
    type: String,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    required: true,
  },
});

// Create the Help model
const Help = mongoose.model("Help", helpSchema);

module.exports = Help;
