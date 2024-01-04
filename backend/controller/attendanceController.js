const Attendance = require("../model/attendance");

// Update attendance (POST /api/attendance)
exports.updateAttendance = async (req, res) => {
  try {
    const attendanceDataArray = req.body;

    // Validate request data
    if (!Array.isArray(attendanceDataArray)) {
      return res.status(400).json({
        message: "Attendance data should be an array.",
      });
    }

    // Iterate through the array and update attendance records
    const updatedAttendanceArray = await Promise.all(
      attendanceDataArray.map(async (attendanceData) => {
        const { _id, name, presentDays, absentDays } = attendanceData;

        // Find the attendance record based on _id
        let attendance = await Attendance.findById(_id);

        // If attendance record exists, update it; otherwise, create a new one
        if (attendance) {
          attendance.presentDays = presentDays;
          attendance.absentDays = absentDays;
        } else {
          attendance = new Attendance({
            _id,
            name,
            presentDays,
            absentDays,
          });
        }

        // Save the updated or new attendance to the database
        return attendance.save();
      })
    );

    // Respond with the updated attendance array
    res.json(updatedAttendanceArray);
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
