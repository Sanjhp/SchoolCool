// authController.js
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateSchoolId = () => {
  // Generate a random 7-digit school ID
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Check user type and save the appropriate data
    let userData;
    if (type === "student") {
      const { rollNumber, class: studentClass } = req.body;
      const schoolId = generateSchoolId();
      userData = {
        name,
        email,
        password,
        rollNumber,
        class: studentClass,
        type,
        schoolId,
      };
    } else if (type === "teacher" || type === "admin") {
      const schoolId = generateSchoolId();
      userData = { name, email, password, type, schoolId };
    } else if (type === "parent") {
      const schoolId = generateSchoolId();
      const children = req.body.children || [];

      userData = { name, email, password, type, schoolId, children };
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user to the database
    const newUser = new User({ ...userData, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email }).populate("children");

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token with the user type
    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    let parentDetails;
    let childrenDetails;

    if (user.type === "parent") {
      // If parent, fetch details of children and parent separately
      parentDetails = { ...user.toObject(), children: undefined };
      const childrenIds = user.children; // Assuming children is an array of schoolIds
      childrenDetails = await User.find({
        schoolId: { $in: childrenIds },
      });
    } else {
      // If other user types, fetch all users with the same school ID
      parentDetails = user;
      childrenDetails = await User.find({ schoolId: user.schoolId });
    }

    res.status(200).json({
      token,
      parent: parentDetails,
      children: childrenDetails,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { class: updatedClass, rollNumber, subject, classTeacher } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields if provided
    if (updatedClass) {
      user.class = updatedClass;
    }
    if (rollNumber) {
      user.rollNumber = rollNumber;
    }
    if (subject) {
      user.subject = subject;
    }
    if (classTeacher) {
      user.classTeacher = classTeacher;
    }

    // Save the updated user to the database
    await user.save();

    // Fetch the updated user data from the database
    const updatedUser = await User.findById(id);

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ type: "student" });
    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getParents = async (req, res) => {
  try {
    const parents = await User.find({ type: "parent" });
    res.status(200).json({ parents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ type: "staff" });
    res.status(200).json({ teachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// authController.js
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Omitting children details
    const userDetails = { ...user.toObject(), children: undefined };

    res.status(200).json({
      user: userDetails,
      message: "User information retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
