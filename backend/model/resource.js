const mongoose = require("mongoose");

// Define the Resource Schema
const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfResourcesAvailable: {
    type: Number,
    required: true,
  },
});

// Create the Resource model
const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
