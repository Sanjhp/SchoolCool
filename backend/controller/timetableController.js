const Timetable = require("../model/timetable");

// Create a new timetable (POST /api/timetable)
exports.createTimetable = async (req, res) => {
  try {
    const { schoolId, day, period, teacherName } = req.body;

    // Validate request data
    if (!schoolId || !day || !period) {
      return res.status(400).json({
        message:
          "schoolId, day, and period are required fields for creating a timetable entry.",
      });
    }

    // Find the timetable based on schoolId
    let timetable = await Timetable.findOne({ schoolId });

    // If no timetable exists, create a new one
    if (!timetable) {
      timetable = new Timetable({
        schoolId,
      });
    }

    // Update the timetable with the teacherName for the specified day and period
    timetable[day][period - 1] = teacherName;

    // Save the updated timetable to the database
    const updatedTimetable = await timetable.save();

    // Respond with the updated timetable
    res.json(updatedTimetable);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Get timetable based on class (GET /api/timetable/:schoolId)
exports.getTimetableByClass = async (req, res) => {
  try {
    const { class: timetableClass } = req.params;

    // Validate class: studentClass
    if (!timetableClass) {
      return res.status(400).json({ message: "class is required." });
    }

    // Fetch timetable based on schoolId
    const timetable = await Timetable.findOne({ class: timetableClass });

    res.json(timetable);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Update timetable entry (PUT /api/timetable)
exports.updateTimetableEntry = async (req, res) => {
  try {
    const { schoolId, day, period, teacherName } = req.body;

    // Validate request data
    if (!schoolId || !day || !period) {
      return res.status(400).json({
        message:
          "schoolId, day, and period are required fields for updating a timetable entry.",
      });
    }

    // Find the timetable based on schoolId
    const timetable = await Timetable.findOne({ schoolId });

    // If no timetable exists, return an error
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found." });
    }

    // Update the timetable with the teacherName for the specified day and period
    timetable[day][period - 1] = teacherName;

    // Save the updated timetable to the database
    const updatedTimetable = await timetable.save();

    // Respond with the updated timetable
    res.json(updatedTimetable);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};
