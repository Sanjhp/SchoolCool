import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  const [count, setCount] = useState({
    studentCount: "",
    staffCount: "",
  });
  const [error, setError] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("4483833"); // Default value

  const dummySchoolIds = ["4483833", "1234567", "9876543", "5555555"];

  async function getCounts() {
    try {
      const studentResponse = await axios.get("/auth/student");
      const staffResponse = await axios.get("/auth/staff");

      if (studentResponse.status !== 200 || staffResponse.status !== 200) {
        console.log(studentResponse.status, staffResponse.status);
      } else {
        setError("");

        const studentCount = Array.isArray(studentResponse.data)
          ? studentResponse.data.length
          : 0;

        setCount({
          studentCount,
          staffCount: staffResponse.data.length,
        });
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  }

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <div className={styles.mainStu}>
      <h1 className={styles.heading}>Summary</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="schoolId">Select School ID:</label>
        <select
          id="schoolId"
          className={styles.inputSearchGrades}
          onChange={(e) => setSelectedSchoolId(e.target.value)}
          value={selectedSchoolId}
        >
          {dummySchoolIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>School Id</th>
            <th>Present Days</th>
            <th>Absent Days</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{count.studentCount}</td>
            <td>{count.staffCount}</td>
            <td></td>{" "}
          </tr>
        </tbody>
      </table>
      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="schoolId">Select School ID:</label>
        <select
          id="schoolId"
          className={styles.inputSearchGrades}
          onChange={(e) => setSelectedSchoolId(e.target.value)}
          value={selectedSchoolId}
        >
          {dummySchoolIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{count.studentCount}</td>
            <td>{count.staffCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
