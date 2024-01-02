/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import home_img from "../../assets/homepage-img.png";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; // Import js-cookie

function LoginPage() {
  const navigate = useNavigate();

  const {
    loginContainer,
    leftContainer,
    leftContainerImg,
    rightContainer,
    rightContainerContent,
    loginCard,
    errorMessage,
    signupLink,
    button,
    inputContainer,
    label,
    input,
    rememberMe,
    rememberMeLabel,
    rememberMeCheckbox,
    loginOptions,
  } = styles;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleLoginSuccess = (data) => {
    console.log("data in success", data);
    // Save user data in cookies
    Cookies.set("user", JSON.stringify(data));
    const storedUser = JSON.parse(Cookies.get("user"));

    // Save token in cookies
    Cookies.set("token", data.token);
    const storedToken = Cookies.get("token");

    console.log("token", storedToken);
    navigate("/dashboard");
    // window.location.reload();
    console.log(storedUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post("/auth/login", userData);
      console.log("Form Data:", formData);
      console.log("User Data:", userData);

      if (response.status === 200) {
        console.log("Login success");
        console.log(response);
        const data = response.data;
        handleLoginSuccess(data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password.");
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div>
      <div className={loginContainer}>
        <div className={leftContainer}>
          <div className={leftContainerImg}>
            <img src={home_img} width="600" />
          </div>
        </div>
        <div className={rightContainer}>
          <div className={rightContainerContent}>
            <h2>Hello! Welcome back.</h2>
            <p>
              Log in with your data that you entered during Your registration.
            </p>
          </div>
          <div className={loginCard}>
            {error && <p className={errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className={inputContainer}>
                <label className={label} htmlFor="email">
                  E-mail
                </label>
                <input
                  className={input}
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={inputContainer}>
                <label className={label} htmlFor="password">
                  Password
                </label>
                <input
                  className={input}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={rememberMe}>
                <label className={rememberMeLabel}>
                  <input
                    className={rememberMeCheckbox}
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  Remember me
                </label>
              </div>
              <div className={styles.btn_wrp}>
                <button className={button} type="submit">
                  Login
                  {loading && <div className="loader"></div>}
                </button>
              </div>
            </form>
            <div className={loginOptions}>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className={signupLink}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
