const Grade = require("../model/grade");
const User = require("../model/user");

// Create a new grade
exports.createGrade = async (req, res) => {
  try {
    const gradeArray = req.body;

    // Validate request data
    if (!Array.isArray(gradeArray) || gradeArray.length === 0) {
      return res.status(400).json({
        message: "Invalid or empty array of grades.",
      });
    }

    // Process each grade in the array
    const savedGrades = [];
    for (const gradeData of gradeArray) {
      const { schoolId, subject, marks, paper } = gradeData;

      // Validate grade data
      if (!schoolId || !subject || !marks || !paper) {
        return res.status(400).json({
          message:
            "schoolId, subject, marks, and paper are required fields for each grade.",
        });
      }

      // Check if the user exists
      const user = await User.findOne({ schoolId });

      if (!user) {
        return res
          .status(404)
          .json({ message: `User not found for schoolId: ${schoolId}` });
      }

      // Create a new Grade instance with fetched user data
      const newGrade = new Grade({
        schoolId: user.schoolId,
        name: user.name,
        class: user.class,
        subject,
        marks,
        paper,
      });

      // Save the new grade to the database
      const savedGrade = await newGrade.save();
      savedGrades.push(savedGrade);
    }

    // Respond with the saved grades
    res.status(201).json(savedGrades);
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
