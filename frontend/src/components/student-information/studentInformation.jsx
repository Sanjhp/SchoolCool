import React, { useState, useEffect } from "react";
import styles from "./studentInformation.module.css";
import axios from "axios";
import { getStudentInfo, updateStudentapi } from "../../../utils/endpoints";

function StudentManagement() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    studentId: "",
    permanentEducationNumber: "",
  });
  const [name, setName] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDetailsStudent();
  };

  async function updateDetailsStudent() {
    try {
      const response = await axios.patch(
        `${updateStudentapi}/${uniqueId}`,
        formData
      );
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        setError("");
        setFormData({
          ...formData,
          name: response.data.student.name,
          rollNo: response.data.student.RollNumber,
          email: response.data.student.email,
          studentId: response.data.student.studentId,
          permanentEducationNumber: response.data.student.panNo,
        });
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  }

  async function getStudentDetails() {
    try {
      const response = await axios.post(getStudentInfo, {
        name: name,
        classStudied: classNumber,
        RollNumber: rollNumber,
      });
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        setError("");
        setUniqueId(response.data.student._id);
        setFormData({
          ...formData,
          name: response.data.student.name,
          rollNo: response.data.student.RollNumber,
          email: response.data.student.email,
          studentId: response.data.student.studentId,
          permanentEducationNumber: response.data.student.panNo,
        });
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  }

  const handleClick = () => {
    getStudentDetails();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Student Information</h1>
      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <div className={styles.input_group}>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.inputSearchGrades}
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="class"
          name="classNumber"
          className={styles.inputSearchGrades}
          value={classNumber}
          placeholder="classNumber"
          onChange={(e) => setClassNumber(e.target.value)}
        />
        <input
          type="text"
          id="roll"
          name="rollNumber"
          className={styles.inputSearchGrades}
          value={rollNumber}
          placeholder="rollNumber"
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button onClick={handleClick} className={styles.edit}>
          Get Student Details
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_group}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="rollNo">Roll No:</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="permanentEducationNumber">
            Permanent Education Number:
          </label>
          <input
            type="text"
            id="permanentEducationNumber"
            name="permanentEducationNumber"
            value={formData.permanentEducationNumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles.btn}>
          <button type="submit" className={styles.submit}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentManagement;
