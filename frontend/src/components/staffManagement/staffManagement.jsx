import React, { useState } from "react";
import styles from "./staffManagement.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StaffManagement() {
  const [toastMessage, setToastMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    class: "",
    email: "",
    teacherId: "",
    subject: "",
    employeestatus: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/auth/update-user/${uniqueId}`,
        formData
      );

      if (response.status !== 200) {
        console.log("Error updating staff details:", response.status);
        setError("Error updating staff details");
      } else {
        console.log("Staff details updated successfully:", response.data);
        setError("");
        // Optionally, you may want to update the state with the latest data
        setFormData({
          ...formData,
          name: response.data.user.name,
          class: response.data.user.classTeacher,
          email: response.data.user.email,
          teacherId: response.data.user.schoolId,
          subject: response.data.user.subject,
          employeestatus: response.data.user.type,
        });
      }
    } catch (err) {
      console.log("Error updating staff details:", err);
      setError("Error updating staff details");
    }
  };

  const handleClick = async () => {
    try {
      const response = await axios.get(`/auth/user/${email}`);

      if (response.status !== 200) {
        console.log("Error fetching staff details:", response.status);
      } else {
        setError("");
        const user = response.data.user || {}; // Ensure 'user' is not null
        setUniqueId(user._id || "");
        setFormData({
          ...formData,
          name: user.name || "",
          class: user.classTeacher || "",
          email: user.email || "",
          teacherId: user.schoolId || "", // Assuming 'schoolId' is the teacherId
          subject: user.subject || "",
          employeestatus: user.type || "", // Assuming 'type' represents employee status
        });
        console.log("Staff details:", user);
      }
    } catch (err) {
      console.log("Error fetching staff details:", err);
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div>
      <div className={styles.main}>
        <h2 className={styles.heading}>Staff Information</h2>
        {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
        <div className={styles.input_group}>
          <input
            type="text"
            id="class"
            name="email"
            value={email}
            className={styles.inputSearchGrades}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.edit} onClick={handleClick}>
            Get Staff Details
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            <label htmlFor="rollNo">Class:</label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="subject">Subject :</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="studentId">Staff ID:</label>
            <input
              type="text"
              id="teacherId"
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="employeestatus">Employee Status :</label>
            <input
              type="text"
              id="employeestatus"
              name="employeestatus"
              value={formData.employeestatus}
              onChange={handleChange}
            />
          </div>
          <div className={styles.btn}>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StaffManagement;
