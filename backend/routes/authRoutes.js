const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Signup route
router.post("/signup", authController.signUp);

// Login route
router.post("/login", authController.login);

// Update user route
router.put("/update-user/:id", authController.updateUser);

// Delete user route
router.delete("/delete-user/:id", authController.deleteUser);

module.exports = router;
