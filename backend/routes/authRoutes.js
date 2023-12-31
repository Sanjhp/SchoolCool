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

router.get("/user", authController.getAllUsers);
router.get("/student", authController.getStudents);
router.get("/staff", authController.getTeachers);
router.get("/parent", authController.getParents);
router.get("/user/:email", authController.getUserByEmail);
router.get("/users/class/:userClass", authController.getUsersByClass);

module.exports = router;
