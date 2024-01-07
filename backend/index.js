// app.js or index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const helpRoutes = require("./routes/helpRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
// const notesRoutes = require("./routes/notesRoutes");

const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://schoolcool:schoolcool@schoolcool.dw6xd8y.mongodb.net/?retryWrites=true&w=majority"
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/notice", noticeRoutes);
app.use("/help", helpRoutes);
app.use("/grade", gradeRoutes);
app.use("/resource", resourceRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/timetable", timetableRoutes);
// app.use("/notes", notesRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
