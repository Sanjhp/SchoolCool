// Header.js
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import styles from "./header.module.css"; // Your module CSS file
import logo from "../../assets/schoolcoollogo.ico";

const Header = () => {
  return (
    <div className={styles.header}>
      {/* Logo (You can replace this with your actual logo) */}
      <img className={styles.logo} src={logo} alt="" />

      {/* Logout Icon */}
      <div className={styles.logout}>
        <FaSignOutAlt color="#03554e" size={24} />
      </div>
    </div>
  );
};

export default Header;
