const express = require("express");
const router = express.Router();
const attendanceController = require("../controller/attendanceController");

// Update attendance (POST /api/attendance)
router.post("/attendance", attendanceController.updateAttendance);

// Get attendance based on school ID (GET /api/attendance/school/:schoolId)
router.get(
  "/attendance/school/:schoolId",
  attendanceController.getAttendanceBySchool
);

// Get attendance based on class (GET /api/attendance/class/:class)
router.get(
  "/attendance/class/:class",
  attendanceController.getAttendanceByClass
);

module.exports = router;
