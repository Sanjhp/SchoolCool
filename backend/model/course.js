const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  studentClass: { type: String, required: true },
  day: { type: String, required: true },
  periods: [
    {
      period: Number,
      subject: String,
      teacher: String,
      schoolId: String,
      timing: String,
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
