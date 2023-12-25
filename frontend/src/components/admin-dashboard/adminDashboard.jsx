import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./adminDashboard.module.css";

const AdminDashboard = () => {
  const [count, setCount] = useState({
    studentCount: "",
    staffCount: "",
  });
  const [error, setError] = useState("");

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
      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Resource</th>
            <th>Available Resources</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{count.studentCount}</td>
            <td>{count.staffCount}</td>
            <td>
              <button
                type="button"
                className={styles.edit}
                // onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className={styles.delete}
                // onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </td>{" "}
          </tr>
        </tbody>
      </table>
      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Student Count</th>
            <th>Staff Count</th>
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

export default AdminDashboard;
