import React, { useState, useEffect } from "react";
import styles from "./profileSettings.module.css"; // Import the CSS module
import Cookies from "js-cookie";
import axios from "axios"; // Import axios
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [children, setChildren] = useState("");
  const [validId, setValidId] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    // Fetch data from cookies
    const userDataFromCookie = Cookies.get("user");
    if (userDataFromCookie) {
      const userData = JSON.parse(userDataFromCookie);

      // Set state based on cookie data
      setName(userData.parent.name || "");
      setEmail(userData.parent.email || "");

      // Assuming there's only one child for simplicity
      const child = userData.children[0] || {};
      setChildren(child.schoolId || "");
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleChildrenChange = (e) => {
    setChildren(e.target.value);
  };

  const handleValidIdChange = (e) => {
    setValidId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  useEffect(() => {
    const isFormComplete =
      name &&
      email &&
      address &&
      phoneNumber &&
      children &&
      validId &&
      password &&
      newPassword;
    setFormComplete(isFormComplete);
  }, [
    name,
    email,
    address,
    phoneNumber,
    children,
    validId,
    password,
    newPassword,
  ]);

  const handleSaveSettings = async () => {
    try {
      const userDataFromCookie = Cookies.get("user");
      if (userDataFromCookie) {
        const userData = JSON.parse(userDataFromCookie);

        const dataToSend = {
          address,
          phone: phoneNumber, // Assuming phone number is stored in phoneNumber state
          selfId: validId,
          children: userData.children.map((child) => child.schoolId).join(","),
        };

        // Assuming you have a backend endpoint for updating user settings
        const response = await axios.put(
          `/auth/update-user/${userData.parent._id}`,
          dataToSend
        );
        toast.success("Settings updated successfully!");

        console.log("Settings saved successfully:", response.data);
      }
    } catch (error) {
      toast.error("Failed to update settings. Please try again.");

      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className={styles["profile-settings-container"]}>
      <div className={styles["profile-settings-form"]}>
        <h2 className={styles["profile-settings-h2"]}>Profile Settings</h2>
        <div className={styles["profile-settings-input-group"]}>
          <div className={styles["profile-settings-row"]}>
            <label className={styles["profile-settings-label"]}>
              <span>Name:</span>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                disabled
                className={styles["profile-settings-input"]}
              />
            </label>
            <label className={styles["profile-settings-label"]}>
              <span>Email:</span>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
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
                onChange={handleAddressChange}
                className={styles["profile-settings-input"]}
              />
            </label>
            <label className={styles["profile-settings-label"]}>
              <span>Phone Number:</span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className={styles["profile-settings-input"]}
              />
            </label>
          </div>
        </div>
        <div className={styles["profile-settings-input-group"]}>
          <div className={styles["profile-settings-row"]}>
            <label className={styles["profile-settings-label"]}>
              <span>Children:</span>
              <input
                type="text"
                value={children}
                onChange={handleChildrenChange}
                className={styles["profile-settings-input"]}
              />
            </label>
            <label className={styles["profile-settings-label"]}>
              <span>Valid ID:</span>
              <input
                type="text"
                value={validId}
                onChange={handleValidIdChange}
                className={styles["profile-settings-input"]}
              />
            </label>
          </div>
        </div>
        {/* <div className={styles["profile-settings-input-group"]}>
          <div className={styles["profile-settings-row"]}>
            <label className={styles["profile-settings-label"]}>
              <span>Current Password:</span>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles["profile-settings-input"]}
              />
            </label>
            <label className={styles["profile-settings-label"]}>
              <span>New Password:</span>
              <input
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className={styles["profile-settings-input"]}
              />
            </label>
          </div>
        </div> */}

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

export default ProfileSettings;
