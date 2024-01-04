import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./manageGrades.module.css";

const ManageGrades = () => {
  const [classCode, setClassCode] = useState("");
  const [subject, setSubject] = useState("");
  const [paper, setPaper] = useState("");
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState([]);
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
      const response = await axios.get(`/auth/users/class/${classCode}`);
      if (response.status === 200) {
        setError("");
        console.log(response.data);

        // Assuming the response structure matches the example you provided
        const mappedStudents = response.data.students.map((student) => ({
          id: student._id,
          name: student.name || "NA",
          schoolId: student.schoolId || "NA",
          marks: 0,
        }));

        setStudents(mappedStudents);
        initializeMarksData(mappedStudents);
        setIsStudentListFetched(true);
      } else {
        setError("Error fetching student data");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg || "An error occurred.");
    }
  };

  const initializeMarksData = (students) => {
    const initialMarksData = students.map((student) => ({
      id: student.id,
      schoolId: student.schoolId,
      name: student.name || "NA",
      marks: 0,
    }));
    setMarksData(initialMarksData);
  };

  const handleSubmit = async () => {
    try {
      const gradeData = marksData.map((student) => ({
        schoolId: student.schoolId,
        subject,
        paper,
        marks: parseInt(student.marks) || 0,
      }));
      console.log(marksData);
      console.log(gradeData);

      // Make the API call to submit grade data
      const response = await axios.post(`/grade/grades`, gradeData);

      if (response.status === 201) {
        console.log("Grade data submitted successfully:", response.data);
        toast.success("Grade data submitted successfully!");
        setError("");
        // Fetch updated marks data after successful submission
        fetchStudents();
      } else {
        setError("Error submitting grade data");
        toast.error("Error submitting grade data. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg || "An error occurred.");
      toast.error("An error occurred. Please try again.");
    }
  };

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

  const papers = ["PT1", "PT2", "Half Yearly", "PT3", "PT4", "Final"];

  return (
    <div className={styles.mainStu}>
      <h2 className={styles.heading}>Manage Grades</h2>
      <div className={styles.addResourceContainer}>
        <input
          type="text"
          placeholder="Enter Class Code"
          value={classCode}
          className={styles.resourceInput}
          onChange={(e) => setClassCode(e.target.value)}
        />
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={styles.resourceInput}
        >
          <option value="" disabled>
            Select Subject
          </option>
          {subjects.map((subj, index) => (
            <option key={index} value={subj}>
              {subj}
            </option>
          ))}
        </select>
        <select
          value={paper}
          onChange={(e) => setPaper(e.target.value)}
          className={styles.resourceInput}
        >
          <option value="" disabled>
            Select Paper
          </option>
          {papers.map((p, index) => (
            <option key={index} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>School Id</th>
            <th>Name</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {marksData.map((student, index) => (
            <tr key={index}>
              <td>{student.schoolId}</td>
              <td>{student.name}</td>
              <td
                contentEditable={true}
                onInput={(e) => {
                  const value = e.currentTarget.textContent;
                  setMarksData((prevData) =>
                    prevData.map((prevStudent, idx) =>
                      idx === index
                        ? { ...prevStudent, marks: value }
                        : prevStudent
                    )
                  );
                }}
              >
                {student.marks}
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

export default ManageGrades;
