const express = require("express");
const router = express.Router();
const timetableController = require("../controller/timetableController");

// Create a new timetable entry or update existing entry (POST /api/timetable)
router.post("/timetable", timetableController.createTimetable);

// Get timetable based on school ID (GET /api/timetable/:schoolId)
router.get("/timetable/:class", timetableController.getTimetableByClass);

// Update timetable entry (PUT /api/timetable)
router.put("/timetable", timetableController.updateTimetableEntry);

module.exports = router;
