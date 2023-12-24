const Attendance = require("../model/attendance");

// Update attendance (POST /api/attendance)
exports.updateAttendance = async (req, res) => {
  try {
    const { schoolId, class: studentClass, isPresent } = req.body;

    // Validate request data
    if (!schoolId || !studentClass || typeof isPresent === "undefined") {
      return res.status(400).json({
        message:
          "schoolId, class, and isPresent are required fields for updating attendance.",
      });
    }

    // Find the attendance record based on schoolId and class
    let attendance = await Attendance.findOne({
      schoolId,
      class: studentClass,
    });

    // If no attendance record exists, create a new one
    if (!attendance) {
      attendance = new Attendance({
        schoolId,
        class: studentClass,
        absentDays: 0,
        presentDays: 0,
      });
    }

    // Update attendance based on isPresent
    if (isPresent) {
      attendance.presentDays += 1;
    } else {
      attendance.absentDays += 1;
    }

    // Save the updated attendance to the database
    const updatedAttendance = await attendance.save();

    // Respond with the updated attendance
    res.json(updatedAttendance);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

exports.getAttendanceBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;

    // Validate schoolId
    if (!schoolId) {
      return res.status(400).json({ message: "SchoolId is required." });
    }

    // Fetch attendance records based on schoolId
    const attendance = await Attendance.find({ schoolId });

    res.json(attendance);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

exports.getAttendanceByClass = async (req, res) => {
  try {
    const { class: studentClass } = req.params;

    // Validate studentClass
    if (!studentClass) {
      return res.status(400).json({ message: "Class is required." });
    }

    // Fetch attendance records based on class
    const attendance = await Attendance.find({ class: studentClass });

    res.json(attendance);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};
