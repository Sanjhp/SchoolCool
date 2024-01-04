import React, { useState, useEffect } from "react";
import styles from "./studentInformation.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentInformation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [children, setChildren] = useState("");
  const [validId, setValidId] = useState("");
  const [classAssigned, setClassAssigned] = useState("");
  const [subject, setSubject] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("Guest");
  const [userId, setUserId] = useState(""); // Add state for user ID

  const [formComplete, setFormComplete] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChildrenChange = (e) => {
    setChildren(e.target.value);
  };

  const handleClassAssignedChange = (e) => {
    setClassAssigned(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleEmployeeStatusChange = (e) => {
    setEmployeeStatus(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`/auth/user/${email}`);
      const userData = response.data.user;

      // Map fetched data to the respective inputs
      setName(userData.name || "");
      setAddress(userData.address || "");
      setPhoneNumber(userData.phone || "");
      setValidId(userData.selfId || "");
      setChildren(userData.schoolId || "");
      setClassAssigned(userData.class || "");
      setSubject(userData._id || "");
      setEmployeeStatus(userData.employeeStatus || "Guest");
      setUserId(userData._id);

      toast.success("Data fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch data. Please try again.");
      console.error("Error fetching user data:", error);
    }
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setAddress("");
    setPhoneNumber("");
    setChildren("");
    setValidId("");
    setClassAssigned("");
    setSubject("");
    setEmployeeStatus("Guest");
    setUserId("");
    setFormComplete(false);
  };

  useEffect(() => {
    const isFormComplete =
      name && email && address && phoneNumber && children && validId;
    setFormComplete(isFormComplete);
  }, [name, email, address, phoneNumber, children, validId]);

  const handleSaveSettings = async () => {
    try {
      const dataToSend = {
        class: classAssigned,
      };

      const response = await axios.put(
        `/auth/update-user/${userId}`,
        dataToSend
      );

      toast.success("Settings updated successfully!");
      resetForm();

      // console.log("Settings saved successfully:", response.data);
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className={styles["profile-settings-container"]}>
      <div className={styles["profile-settings-form"]}>
        <h2 className={styles["profile-settings-h2"]}>Student Information</h2>
        <div className={styles["profile-settings-input-group"]}>
          <div className={styles["profile-settings-row"]}>
            <label className={styles["profile-settings-label"]}>
              <span>Email:</span>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={styles["profile-settings-input"]}
              />
            </label>
            <button
              className={styles["profile-settings-fetch"]}
              onClick={fetchData}
            >
              Fetch Data
            </button>
            <label className={styles["profile-settings-label"]}>
              <span>School ID:</span>
              <input
                type="text"
                value={children}
                onChange={handleChildrenChange}
                className={styles["profile-settings-input"]}
                disabled
              />
            </label>
          </div>
        </div>
        <div className={styles["profile-settings-input-group"]}>
          <div className={styles["profile-settings-row"]}>
            <label className={styles["profile-settings-label"]}>
              <span>Name:</span>
              <input
                type="text"
                value={name}
                className={styles["profile-settings-input"]}
                disabled
              />
            </label>
            <label className={styles["profile-settings-label"]}>
              <span>Phone Number:</span>
              <input
                type="tel"
                value={phoneNumber}
                className={styles["profile-settings-input"]}
                disabled
              />
            </label>
          </div>
        </div>
        <div className={styles["profile-settings-input-group"]}>
          <div className={styles["profile-settings-row"]}>
            <label className={styles["profile-settings-label"]}>
              <span>Address:</span>
              <input
                type="text"
                value={address}
                className={styles["profile-settings-input"]}
                disabled
              />
            </label>
            <label className={styles["profile-settings-label"]}>
              <span>Valid ID:</span>
              <input
                type="text"
                value={validId}
                className={styles["profile-settings-input"]}
                disabled
              />
            </label>
          </div>
        </div>
        <div className={styles["profile-settings-input-group"]}>
          <div className={styles["profile-settings-row"]}>
            <label className={styles["profile-settings-label"]}>
              <span>Class Assigned:</span>
              <input
                type="text"
                value={classAssigned}
                onChange={handleClassAssignedChange}
                className={styles["profile-settings-input"]}
              />
            </label>
            <label className={styles["profile-settings-label"]}>
              <span>Permanent Education Number:</span>
              <input
                type="text"
                value={subject}
                onChange={handleSubjectChange}
                className={styles["profile-settings-input"]}
              />
            </label>
          </div>
        </div>
        <button
          className={`${styles["profile-settings-submit"]} ${
            formComplete ? styles["complete"] : ""
          }`}
          onClick={handleSaveSettings}
        >
          Save Settings
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default StudentInformation;
