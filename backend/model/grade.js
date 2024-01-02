const mongoose = require("mongoose");

// Define the Grade Schema
const gradeSchema = new mongoose.Schema({
  schoolId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  paper: {
    type: String,
    enum: ["PT1", "PT2", "Half Yearly", "PT3", "PT4", "Final"],
  },
});

// Create the Grade model
const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
