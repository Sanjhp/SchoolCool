/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import axios from "axios";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import home_img from "../../assets/homepage-img.png";

function SignupPage() {
  const navigate = useNavigate();

  // State for form data and error message
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    registerAs: "", // Updated field for registration role
    class: "", // New field for class (applicable for students)
    childSchoolId: "", // Updated field for Child's School ID (applicable for parents)
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Event handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create an object containing common user data
      const commonUserData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        type: formData.registerAs,
      };

      // Extend commonUserData based on the selected role
      let userData;
      if (formData.registerAs === "student") {
        userData = {
          ...commonUserData,
          class: formData.class,
        };
      } else if (formData.registerAs === "parent") {
        userData = {
          ...commonUserData,
          children: formData.childSchoolId.split(",").map((id) => id.trim()),
        };
      } else {
        userData = commonUserData;
      }

      // Send the signup request to the server with all user data
      const response = await axios.post("/auth/signup", userData);
      setLoading(false);

      console.log("Signup Response:", response.data);

      if (response.data.message === "User created successfully") {
        toast.success("User registered successfully!!");
        navigate("/login");
      } else if (response.data.error === "Email already exists") {
        setError("User with this email already exists.");
        toast.error("User with this email already exists");
      } else {
        setError("Sign-up failed. Please try again.");
        toast.error("Sign-up failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup failed:", error);
      toast.error("Sign-up failed. Please try again.");
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.registerContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftContainerImg}>
            <img src={home_img} width="600" />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContainerContent}>
            <h2>Hello! Welcome </h2>
            <p>Enter your data for registration</p>
          </div>
          <div className={styles.signupCard}>
            <form onSubmit={handleSubmit}>
              {/* Register As Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="registerAs">
                  Register As
                </label>
                <select
                  className={styles.input}
                  id="registerAs"
                  name="registerAs"
                  value={formData.registerAs}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a role...</option>
                  <option value="admin">Admin</option>
                  <option value="parent">Parent</option>
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              {/* Full Name Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className={styles.input}
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Class Input (for students) */}
              {formData.registerAs === "student" && (
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="class">
                    Class
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* Child's School ID Input (for parents) */}
              {formData.registerAs === "parent" && (
                <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="childSchoolId">
                    Child's School ID (if more than one seperate by comma (,))
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="childSchoolId"
                    name="childSchoolId"
                    value={formData.childSchoolId}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {/* Password Input */}
              <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Error message */}
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.btn_wrp}>
                <button className={styles.button} type="submit">
                  {loading && <div className="loader"></div>}
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <p className={styles.loginLinkp}>
            Already have an account?{" "}
            <Link to="/login" className={styles.loginLink}>
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignupPage;
