import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./manageAttendance.module.css";

const ManageAttendance = () => {
  const [classCode, setClassCode] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState("");
  const [isStudentListFetched, setIsStudentListFetched] = useState(false);

  useEffect(() => {
    // Fetch students when the component mounts or when classCode changes
    if (classCode) {
      fetchStudents();
    }
  }, [classCode]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `/attendance/attendance/class/${classCode}`
      );
      if (response.status === 200) {
        setError("");
        console.log(response.data);
        setStudents(response.data);
        initializeAttendanceData(response.data);
        setIsStudentListFetched(true);
      } else {
        setError("Error fetching attendance data");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg || "An error occurred.");
    }
  };

  const initializeAttendanceData = (students) => {
    const initialAttendanceData = students.map((student) => ({
      id: student._id,
      name: student.name || "NA",
      presentDays: student.presentDays || 0,
      absentDays: student.absentDays || 0,
      status: "", // "present" or "absent"
    }));
    setAttendanceData(initialAttendanceData);
  };

  const handleRadioChange = (index, status) => {
    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData[index].status = status;
    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmit = async () => {
    try {
      const updatedAttendance = attendanceData.map((student) => ({
        _id: student.id,
        name: student.name,
        presentDays:
          student.status === "present"
            ? student.presentDays + 1
            : student.presentDays,
        absentDays:
          student.status === "absent"
            ? student.absentDays + 1
            : student.absentDays,
      }));

      // Make the API call to update attendance data
      const response = await axios.post(
        `/attendance/attendance`,
        updatedAttendance
      );

      if (response.status === 200) {
        console.log("Attendance data updated successfully:", response.data);
        toast.success("Attendance updated successfully!");
        setError("");
        // Fetch updated attendance data after successful update
        fetchStudents();
      } else {
        setError("Error updating attendance data");
        toast.error("Error updating attendance data. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg || "An error occurred.");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.mainStu}>
      <h2 className={styles.heading}>Manage Attendance</h2>
      <div className={styles.addResourceContainer}>
        <input
          type="text"
          placeholder="Enter Class Code"
          value={classCode}
          className={styles.resourceInput}
          onChange={(e) => setClassCode(e.target.value)}
        />
      </div>
      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Name</th>
            <th>Present Days</th>
            <th>Absent Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.presentDays}</td>
              <td>{student.absentDays}</td>
              <td>
                <label>
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="present"
                    checked={student.status === "present"}
                    onChange={() => handleRadioChange(index, "present")}
                  />
                  Present
                </label>
                <label>
                  <input
                    type="radio"
                    name={`status-${index}`}
                    value="absent"
                    checked={student.status === "absent"}
                    onChange={() => handleRadioChange(index, "absent")}
                  />
                  Absent
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isStudentListFetched && (
        <button className={styles.edit} onClick={handleSubmit}>
          Submit
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageAttendance;
