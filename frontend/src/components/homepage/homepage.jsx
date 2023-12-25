// Import React and other dependencies
import React from "react";
import { Link } from "react-router-dom";
import home_img from "../../assets/homepage-img.png";

// Import the CSS styles
import styles from "./homepage.module.css";

const Homepage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.secondContainer}>
        <div className={styles.item}>
          <img src={home_img} className={styles.img} alt="students" />
        </div>
        <div className={styles.secondItem}>
          <div className={styles.paper}>
            <h1 className={styles.title}>
              Welcome to
              <br />
              <span className={styles.schoolcool}>SchoolCool</span>
              <br />
              System
            </h1>
            <p className={styles.text}>
              Streamline school management, class organization, and add students
              and faculty. Seamlessly track attendance, assess performance, and
              provide feedback. Access records, view marks, and communicate
              effortlessly.
            </p>
            <div className={styles.box}>
              <Link to="/login" className={styles.link}>
                <button className={styles.greenButton}>Login</button>
              </Link>

              <p className={styles.text}>
                Don't have an account?{" "}
                <Link to="/signup" className={styles.signup}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
