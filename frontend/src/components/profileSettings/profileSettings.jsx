import React, { useState, useEffect } from "react";
import styles from "./profileSettings.module.css"; // Import the CSS module

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [topics, setTopics] = useState("");
  const [coachingStyle, setCoachingStyle] = useState("");
  const [formComplete, setFormComplete] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleTopicsChange = (e) => {
    setTopics(e.target.value);
  };

  const handleCoachingStyleChange = (e) => {
    setCoachingStyle(e.target.value);
  };

  useEffect(() => {
    const isFormComplete =
      name && email && password && newPassword && topics && coachingStyle;
    setFormComplete(isFormComplete);
  }, [name, email, password, newPassword, topics, coachingStyle]);

  const handleSaveSettings = () => {
    console.log("Saving settings...");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("New Password:", newPassword);
    console.log("Topics:", topics);
    console.log("Coaching Style:", coachingStyle);
  };

  const handleForgotPasswordClick = () => {
    console.log("Forgot Password clicked.");
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
              />
            </label>
          </div>
        </div>
        <div className={styles["profile-settings-input-group"]}>
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
        </div>
        <div className={styles["profile-settings-input-group"]}>
          <div className={styles["profile-settings-row"]}>
            <label className={styles["profile-settings-label"]}>
              <span>Topics:</span>
              <input
                type="text"
                value={topics}
                onChange={handleTopicsChange}
                className={styles["profile-settings-input"]}
              />
            </label>
            <label className={styles["profile-settings-label"]}>
              <span>Coaching Style:</span>
              <input
                type="text"
                value={coachingStyle}
                onChange={handleCoachingStyleChange}
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
      </div>
    </div>
  );
};

export default ProfileSettings;
