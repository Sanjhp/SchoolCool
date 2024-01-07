import React, { useState, useEffect } from "react";
import styles from "./course.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseCreation = () => {
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [teacherList, setTeacherList] = useState([]);

  const [timetable, setTimetable] = useState({
    classes: studentClass,
    days: [
      {
        day: selectedDay,
        periods: [
          { period: 1, subject: "", teacher: "", timing: "8:00 AM" },
          { period: 2, subject: "", teacher: "", timing: "9:00 AM" },
          { period: 3, subject: "", teacher: "", timing: "10:00 AM" },
          { period: 4, subject: "", teacher: "", timing: "11:00 AM" },
          { period: 5, subject: "", teacher: "", timing: "1:00 PM" },
        ],
      },
    ],
  });

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

  useEffect(() => {
    // Fetch teacher list when the component mounts
    fetchTeacherList();
  }, []);

  const fetchTeacherList = async () => {
    try {
      const response = await axios.get("/auth/staff");
      setTeacherList(response.data.teachers);
    } catch (error) {
      console.error("Error fetching teacher list:", error);
      // Handle error
    }
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleInputChange = (period, field, value) => {
    const updatedTimetable = { ...timetable };
    updatedTimetable.days[0].periods[period - 1][field] = value;
    setTimetable(updatedTimetable);
  };

  const handleClick = async () => {
    try {
      // Create an array to hold the periods data
      const periodsData = timetable.days[0].periods.map((period) => ({
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

      setStudentClass("");
      setSelectedDay("");
      setTimetable({
        classes: "",
        days: [
          {
            day: "",
            periods: [
              { period: 1, subject: "", teacher: "", timing: "8:00 AM" },
              { period: 2, subject: "", teacher: "", timing: "9:00 AM" },
              { period: 3, subject: "", teacher: "", timing: "10:00 AM" },
              { period: 4, subject: "", teacher: "", timing: "11:00 AM" },
              { period: 5, subject: "", teacher: "", timing: "1:00 PM" },
            ],
          },
        ],
      });
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
        onChange={(e) => setStudentClass(e.target.value)}
        list="query"
        placeholder="Class"
      />
      <select
        className={styles.inputSearchGrades}
        onChange={handleDayChange}
        value={selectedDay}
      >
        <option value="">Select Day</option>
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
          {timetable.days[0].periods.map((period, index) => (
            <tr key={index}>
              <td>{`Period ${period.period}`}</td>
              <td>
                <select
                  value={period.subject}
                  onChange={(e) =>
                    handleInputChange(period.period, "subject", e.target.value)
                  }
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={period.teacher}
                  onChange={(e) =>
                    handleInputChange(period.period, "teacher", e.target.value)
                  }
                >
                  <option value="">Select Teacher</option>
                  {teacherList.map((teacher) => (
                    <option key={teacher._id} value={teacher.name}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.edit} onClick={handleClick}>
        Create schedule{" "}
      </button>
      <ToastContainer />
    </div>
  );
};

export default CourseCreation;
