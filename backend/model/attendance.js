const mongoose = require("mongoose");

// Define the Attendance Schema
const attendanceSchema = new mongoose.Schema({
  schoolId: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  absentDays: {
    type: Number,
    default: 0,
  },
  presentDays: {
    type: Number,
    default: 0,
  },
});

// Create the Attendance model
const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
