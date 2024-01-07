const Course = require("../model/course");

// Controller to create a new course
exports.createCourse = async (req, res) => {
  try {
    const { studentClass, day, periods } = req.body;
    const newCourse = new Course({ studentClass, day, periods });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCoursesBySchoolId = async (req, res) => {
  try {
    const { schoolId } = req.params;

    // Fetch courses based on schoolId
    const courses = await Course.find({
      "periods.schoolId": schoolId,
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses by schoolId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCoursesByClass = async (req, res) => {
  try {
    const { studentClass } = req.params;

    // Fetch courses based on class
    const courses = await Course.find({
      studentClass: studentClass,
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses by class:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error getting courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
