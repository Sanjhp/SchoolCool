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
    enum: ["student", "staff", "parent", "admin"],
    required: true,
  },
  class: {
    type: String,
  },
  classTeacher: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  selfId: {
    type: String,
  },
  estatus: {
    type: String,
    enum: ["temprory", "permanent"],
    required: true,
  },
  children: {
    type: [String], // Specify that it's an array of strings
    validate: {
      validator: function (value) {
        // Custom validator to check if each element in the array is a valid string
        return value.every((v) => typeof v === "string");
      },
      message: "Invalid value in children array",
    },
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
