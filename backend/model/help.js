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
  reply: {
    type: String,
  },
});

// Create the Help model
const Help = mongoose.model("Help", helpSchema);

module.exports = Help;
