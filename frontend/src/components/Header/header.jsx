// Header.js
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./header.module.css"; // Your module CSS file
import logo from "../../assets/schoolcoollogo.ico";

const Header = ({ role }) => {
  const navigate = useNavigate();

  // Define the dashboard link based on the role
  const dashboardLink = `/dashboard`;

  const handleLogout = () => {
    // Clear the "user" cookie
    Cookies.remove("user");
    // Navigate to the home page
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.header}>
      {/* Logo (You can replace this with your actual logo) */}
      <Link to={dashboardLink}>
        <img className={styles.logo} src={logo} alt="" />
      </Link>

      {/* Logout Icon */}
      <div className={styles.logout} onClick={handleLogout}>
        <FaSignOutAlt color="#03554e" size={24} />
      </div>
    </div>
  );
};

export default Header;
