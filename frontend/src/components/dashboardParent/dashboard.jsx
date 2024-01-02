import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./dashboard.module.css";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [count, setCount] = useState({
    presentDays: null,
    absentDays: null,
  });
  const [error, setError] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState(""); // Default value
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState("PT1"); // Default value
  const [subjectMarks, setSubjectMarks] = useState([]);

  const dummyPapers = ["PT1", "PT2", "Half Yearly", "PT3", "PT4", "Final"];

  useEffect(() => {
    // Fetch schoolId from cookies
    const userDataFromCookie = Cookies.get("user");
    if (userDataFromCookie) {
      const parsedUserData = JSON.parse(userDataFromCookie);
      const childrenSchoolIds = parsedUserData.children.map(
        (child) => child.schoolId
      );

      // Set the default selectedSchoolId as the first child's schoolId
      setSelectedSchoolId(childrenSchoolIds[0]);

      // Create options for the first dropdown based on children's school IDs
      const dropdownOptions = childrenSchoolIds.map((id) => (
        <option key={id} value={id}>
          {id}
        </option>
      ));

      setDropdownOptions(dropdownOptions);
    }
  }, []);

  useEffect(() => {
    if (selectedSchoolId && selectedPaper) {
      getCounts(selectedSchoolId);
      getSubjectMarks(selectedSchoolId, selectedPaper);
    }
  }, [selectedSchoolId, selectedPaper]);

  async function getCounts(schoolId) {
    try {
      const attendanceResponse = await axios.get(
        `/attendance/attendance/school/${schoolId}`
      );

      if (attendanceResponse.status !== 200) {
        console.log(attendanceResponse.status);
        if (attendanceResponse.data.error) {
          setError(attendanceResponse.data.error);
        }
      } else {
        setError("");
        const attendanceData = attendanceResponse.data[0]; // Assuming there is only one record
        setCount({
          presentDays: attendanceData ? attendanceData.presentDays : null,
          absentDays: attendanceData ? attendanceData.absentDays : null,
        });
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg);
    }
  }

  async function getSubjectMarks(schoolId, paper) {
    try {
      const gradesResponse = await axios.get(`/grade/grades/${schoolId}`);
      if (gradesResponse.status !== 200) {
        console.log(gradesResponse.status);
        if (gradesResponse.data.error) {
          setError(gradesResponse.data.error);
        }
      } else {
        setError("");
        // Filter grades based on the selected paper
        const filteredGrades = gradesResponse.data.filter(
          (grade) => grade.paper === paper
        );
        // Extract subject and marks from the filtered grades
        const subjectsAndMarks = filteredGrades.map((grade) => ({
          subject: grade.subject || "N/A",
          marks: grade.marks !== undefined ? grade.marks : "N/A",
        }));
        setSubjectMarks(subjectsAndMarks);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg);
    }
  }

  return (
    <div className={styles.mainStu}>
      <h1 className={styles.heading}>Summary</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="schoolId">Select Child's School ID:</label>
        <select
          id="schoolId"
          className={styles.inputSearchGrades}
          onChange={(e) => setSelectedSchoolId(e.target.value)}
          value={selectedSchoolId}
        >
          {dropdownOptions}
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
            <td>{selectedSchoolId}</td>
            <td>{count.presentDays !== null ? count.presentDays : "N/A"}</td>
            <td>{count.absentDays !== null ? count.absentDays : "N/A"}</td>
          </tr>
        </tbody>
      </table>
      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <label htmlFor="paper">Select Term:</label>
        <select
          id="paper"
          className={styles.inputSearchGrades}
          onChange={(e) => setSelectedPaper(e.target.value)}
          value={selectedPaper}
        >
          {dummyPapers.map((paper) => (
            <option key={paper} value={paper}>
              {paper}
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
          {subjectMarks && subjectMarks.length > 0 ? (
            subjectMarks.map((subjectMark, index) => (
              <tr key={index}>
                <td>{subjectMark.subject}</td>
                <td>{subjectMark.marks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">
                {subjectMarks ? "No subject marks available." : "Loading..."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
