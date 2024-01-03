import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./adminDashboard.module.css";

const AdminDashboard = () => {
  const [staff, setStaff] = useState([]);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState("");
  const [editableResource, setEditableResource] = useState(null);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  async function getStaff() {
    try {
      const response = await axios.get("/auth/staff");
      setStaff(response.data.teachers);
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  }

  async function getResources() {
    try {
      const response = await axios.get("/resource/resources");
      setResources(response.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  }

  const handleUpdateResource = async (id, name, updatedValue) => {
    try {
      const response = await axios.patch(`resource/resources/${id}`, {
        name,
        numberOfResourcesAvailable: updatedValue,
      });
      const updatedResources = resources.map((resource) =>
        resource._id === id ? response.data : resource
      );
      setResources(updatedResources);
      notifySuccess("Resource updated successfully!");
      setEditableResource(null);
    } catch (error) {
      notifyError("Failed to update resource. Please try again.");
      console.error("Error updating resource:", error);
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      await axios.delete(`resource/resources/${id}`);
      const updatedResources = resources.filter(
        (resource) => resource._id !== id
      );
      setResources(updatedResources);
      notifySuccess("Resource deleted successfully!");
    } catch (error) {
      notifyError("Failed to delete resource. Please try again.");
      console.error("Error deleting resource:", error);
    }
  };

  useEffect(() => {
    getStaff();
    getResources();
  }, []);

  return (
    <div className={styles.mainStu}>
      <h2 className={styles.heading}>Staff Information</h2>
      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Address</th> */}
            <th>Class Teacher</th>
            <th>Phone</th>
            {/* <th>Staff ID</th> */}
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher?.name}</td>
              <td>{teacher?.email}</td>
              {/* <td>{teacher.address}</td> */}
              <td>{teacher?.classTeacher}</td>
              {/* <td>{teacher.phone}</td> */}
              <td>{teacher?.selfId}</td>
              <td>{teacher?.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className={styles.heading}>Resource Information</h2>
      <table className={styles.studentTable}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Resource Name</th>
            <th>Number of Resources Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource._id}>
              <td>{resource.name}</td>
              <td>
                {editableResource === resource._id ? (
                  <input
                    type="number"
                    value={resource.numberOfResourcesAvailable}
                    onChange={(e) =>
                      handleUpdateResource(
                        resource._id,
                        resource.name,
                        e.target.value
                      )
                    }
                  />
                ) : (
                  resource.numberOfResourcesAvailable
                )}
              </td>
              <td>
                {editableResource === resource._id ? (
                  <button
                    type="button"
                    className={styles.edit}
                    onClick={() => handleUpdateResource(resource._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.edit}
                    onClick={() => setEditableResource(resource._id)}
                  >
                    Update
                  </button>
                )}
                <button
                  type="button"
                  className={styles.delete}
                  onClick={() => handleDeleteResource(resource._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error.length !== 0 && <div style={{ color: "red" }}>*{error}</div>}
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
