import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./staffDashboard.module.css";

const StaffDashboard = () => {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState("");

  async function getStaff() {
    try {
      const response = await axios.get("/auth/student");
      const sortedStaff = response.data.students.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setStaff(sortedStaff);
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  }

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <div className={styles.mainStu}>
      <h2 className={styles.heading}>Student List</h2>

      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>School ID</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher?.name}</td>
              <td>{teacher?.email}</td>
              <td>{teacher.address}</td>
              <td>{teacher.phone}</td>
              <td>{teacher?.schoolId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
    </div>
  );
};

export default StaffDashboard;
