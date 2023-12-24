const Resource = require("../model/resource");

// Create a new resource
exports.createResource = async (req, res) => {
  try {
    const { name, numberOfResourcesAvailable } = req.body;

    // Validate request data
    if (
      !name ||
      !numberOfResourcesAvailable ||
      isNaN(numberOfResourcesAvailable)
    ) {
      return res.status(400).json({
        message:
          "Name and valid numberOfResourcesAvailable are required fields for creating a resource.",
      });
    }

    // Create a new Resource instance
    const newResource = new Resource({
      name,
      numberOfResourcesAvailable,
    });

    // Save the new resource to the database
    const savedResource = await newResource.save();

    // Respond with the saved resource
    res.status(201).json(savedResource);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    // Fetch all resources
    const resources = await Resource.find();

    res.json(resources);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Get a resource by ID
exports.getResourceById = async (req, res) => {
  try {
    // Find the resource by ID
    const resource = await Resource.findById(req.params.id);

    // Check if the resource exists
    if (!resource) {
      return res.status(404).json({ message: "Resource not found." });
    }

    res.json(resource);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Update a resource by ID
exports.updateResourceById = async (req, res) => {
  try {
    const { name, numberOfResourcesAvailable } = req.body;

    // Validate request data
    if (
      !name ||
      !numberOfResourcesAvailable ||
      isNaN(numberOfResourcesAvailable)
    ) {
      return res.status(400).json({
        message:
          "Name and valid numberOfResourcesAvailable are required fields for updating a resource.",
      });
    }

    // Find the resource by ID
    const resource = await Resource.findById(req.params.id);

    // Check if the resource exists
    if (!resource) {
      return res.status(404).json({ message: "Resource not found." });
    }

    // Update the resource fields
    resource.name = name;
    resource.numberOfResourcesAvailable = numberOfResourcesAvailable;

    // Save the updated resource to the database
    const updatedResource = await resource.save();

    // Respond with the updated resource
    res.json(updatedResource);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Delete a resource by ID
exports.deleteResourceById = async (req, res) => {
  try {
    // Find the resource by ID and delete it
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);

    // Check if the resource was found and deleted
    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found." });
    }

    res.json({ message: "Resource deleted successfully." });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};
