const express = require("express");
const router = express.Router();
const gradeController = require("../controller/gradeController");

// Create a new grade
router.post("/grades", gradeController.createGrade);

// Get grades based on schoolId
router.get("/grades/:schoolId", gradeController.getGradesBySchoolId);

// Update a grade
router.patch("/grades/:schoolId", gradeController.updateGrade);

module.exports = router;
