import React, { useState, useEffect } from "react";
import styles from "./course.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const FetchCourse = () => {
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(getPresentDay());
  const [studentClass, setStudentClass] = useState("");
  const [teacherList, setTeacherList] = useState([]);
  const [timetable, setTimetable] = useState([]);

  const subjects = [
    "Accountancy",
    "Biology",
    "Business Studies",
    "Chemistry",
    "Economics",
    "English",
    "Hindi",
    "Information Practices",
    "Maths",
    "Physical Education",
    "Physics",
    "Science",
    "Social Studies",
  ];

  const [role, setRole] = useState("undefined");

  useEffect(() => {
    // Fetch the user data from cookies
    const userData = Cookies.get("user");

    if (userData) {
      // Parse the user data JSON
      const user = JSON.parse(userData);

      // Extract the class from the user data
      const userClass = user.parent?.class || "";

      // Set the class in the state
      setStudentClass(userClass);
    }

    // Fetch teacher list when the component mounts
    fetchTeacherList();
    // Fetch timetable for the present day
    fetchTimetable(studentClass, selectedDay);
  }, [studentClass, selectedDay]); // Trigger fetchTeacherList and fetchTimetable when class or selected day changes

  const fetchTeacherList = async () => {
    try {
      const response = await axios.get("/auth/staff");
      setTeacherList(response.data.teachers);
    } catch (error) {
      console.error("Error fetching teacher list:", error);
      // Handle error
    }
  };

  const fetchTimetable = async (classParam, day) => {
    try {
      const response = await axios.get(
        `/course/courses?class=${classParam}&day=${day}`
      );
      setTimetable(response.data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
      // Handle error
    }
  };

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    setSelectedDay(selectedDay);
    fetchTimetable(studentClass, selectedDay);
  };

  const handleInputChange = (period, field, value) => {
    const updatedTimetable = [...timetable];
    const updatedPeriods = updatedTimetable[0].periods.map((p) =>
      p.period === period ? { ...p, [field]: value } : p
    );
    updatedTimetable[0].periods = updatedPeriods;
    setTimetable(updatedTimetable);
  };

  const handleClick = async () => {
    try {
      // Create an array to hold the periods data
      const periodsData = timetable[0].periods.map((period) => ({
        period: period.period,
        subject: period.subject,
        teacher: period.teacher,
        timing: period.timing,
      }));

      // Make a POST request to send the data to the backend
      const response = await axios.post("/course/courses", {
        studentClass,
        day: selectedDay,
        periods: periodsData,
      });

      console.log(studentClass, selectedDay, periodsData);
      console.log("Response from backend:", response.data);
      toast.success("Schedule created successfully!");

      // Clear the timetable and selected day
      setSelectedDay(getPresentDay());
      setTimetable([]);
    } catch (error) {
      console.error("Error sending data to backend:", error);
      // Handle error
      toast.error("Error creating schedule. Please try again.");
    }
  };

  return (
    <div>
      <h1 className={styles.headingGrades}>Course Schedule</h1>
      <input
        className={styles.inputSearchGrades}
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
        placeholder="Class"
      />
      <select
        className={styles.inputSearchGrades}
        onChange={handleDayChange}
        value={selectedDay}
      >
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        {/* Add more options as needed */}
      </select>

      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Period</th>
            <th>Subject</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {timetable.length > 0 ? (
            timetable[0].periods.map((period, index) => (
              <tr key={index}>
                <td>{`Period ${period.period}`}</td>
                <td>{period.subject}</td>
                <td>{period.teacher}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available for the selected day</td>
            </tr>
          )}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default FetchCourse;

function getPresentDay() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date().getDay(); // 0 for Sunday, 1 for Monday, ...
  return daysOfWeek[today];
}
