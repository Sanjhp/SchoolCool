const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema({
  schoolId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rollNumber: {
    type: String,
  },
  subject: {
    type: String,
  },
  type: {
    type: String,
    enum: ["student", "teacher", "parent", "admin"],
    required: true,
  },
  class: {
    type: String,
  },
  classTeacher: {
    type: String,
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
