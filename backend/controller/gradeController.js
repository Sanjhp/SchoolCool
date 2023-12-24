const Grade = require("../model/grade");
const User = require("../model/user");

// Create a new grade
exports.createGrade = async (req, res) => {
  try {
    const { schoolId, subject, marks } = req.body;

    // Validate request data
    if (!schoolId || !subject || !marks) {
      return res
        .status(400)
        .json({ message: "schoolId, subject, and marks are required fields." });
    }

    // Check if the user exists
    const user = await User.findOne({ schoolId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new Grade instance with fetched user data
    const newGrade = new Grade({
      schoolId: user.schoolId,
      name: user.name,
      class: user.class,
      subject,
      marks,
    });

    // Save the new grade to the database
    const savedGrade = await newGrade.save();

    // Respond with the saved grade
    res.status(201).json(savedGrade);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Get grades based on schoolId
exports.getGradesBySchoolId = async (req, res) => {
  try {
    const { schoolId } = req.params;

    // Validate schoolId
    if (!schoolId) {
      return res.status(400).json({ message: "SchoolId is required." });
    }

    // Fetch grades based on schoolId
    const grades = await Grade.find({ schoolId });

    res.json(grades);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};

// Update a grade
exports.updateGrade = async (req, res) => {
  try {
    const { subject, marks } = req.body;

    // Validate request data
    if (!subject || !marks) {
      return res.status(400).json({
        message: "Subject and marks are required fields for updating.",
      });
    }

    // Find the grade by schoolId
    const grade = await Grade.findOne({ schoolId: req.params.schoolId });

    // Check if the grade exists
    if (!grade) {
      return res.status(404).json({ message: "Grade not found." });
    }

    // Update the grade fields
    grade.subject = subject;
    grade.marks = marks;

    // Save the updated grade to the database
    const updatedGrade = await grade.save();

    // Respond with the updated grade
    res.json(updatedGrade);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
};
