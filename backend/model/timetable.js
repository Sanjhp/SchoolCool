const mongoose = require("mongoose");

// Define the Timetable Schema
const timetableSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  monday: {
    type: [String], // Array of teacher names or null
    default: Array(5).fill(null), // Default to an array of 5 null values
  },
  tuesday: {
    type: [String],
    default: Array(5).fill(null),
  },
  wednesday: {
    type: [String],
    default: Array(5).fill(null),
  },
  thursday: {
    type: [String],
    default: Array(5).fill(null),
  },
  friday: {
    type: [String],
    default: Array(5).fill(null),
  },
  saturday: {
    type: [String],
    default: Array(5).fill(null),
  },
});

// Create the Timetable model
const Timetable = mongoose.model("Timetable", timetableSchema);

module.exports = Timetable;
