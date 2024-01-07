const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");

// Create a new course
router.post("/courses", courseController.createCourse);

// Get all courses
router.get("/staff/:schoolId", courseController.getCoursesBySchoolId);
router.get("/class/:studentClass", courseController.getCoursesByClass);
router.get("/courses", courseController.getAllCourses);

module.exports = router;
