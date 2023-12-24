const express = require("express");
const router = express.Router();
const resourceController = require("../controller/resourceController");

// Create a new resource
router.post("/resources", resourceController.createResource);

// Get all resources
router.get("/resources", resourceController.getAllResources);

// Get a resource by ID
router.get("/resources/:id", resourceController.getResourceById);

// Update a resource by ID
router.patch("/resources/:id", resourceController.updateResourceById);

// Delete a resource by ID
router.delete("/resources/:id", resourceController.deleteResourceById);

module.exports = router;
