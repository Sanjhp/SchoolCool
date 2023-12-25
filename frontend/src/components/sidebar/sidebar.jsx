// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaNewspaper,
  FaChalkboardTeacher,
  FaBookReader,
} from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import styles from "./sidebar.module.css"; // Your module CSS file

const Sidebar = ({ role }) => {
  let sidebarData;

  switch (role) {
    case "admin":
      sidebarData = [
        {
          label: "Admin Dashboard",
          icon: <FaHome />,
          link: "/admin/dashboard",
        },
        {
          label: "Create Notice",
          icon: <FaNewspaper />,
          link: "/admin/create-notice",
        },
        {
          label: "Update Staff",
          icon: <FaChalkboardTeacher />,
          link: "/admin/update-staff",
        },
      ];
      break;
    case "student":
      sidebarData = [
        {
          label: "Student Dashboard",
          icon: <FaHome />,
          link: "/student/dashboard",
        },
        {
          label: "Help",
          icon: <BsFillQuestionCircleFill />,
          link: "/student/help",
        },
        { label: "Grades", icon: <FaBookReader />, link: "/student/grades" },
      ];
      break;
    case "staff":
      sidebarData = [
        {
          label: "Staff Dashboard",
          icon: <FaHome />,
          link: "/staff/dashboard",
        },
        { label: "Courses", icon: <FaBookReader />, link: "/staff/courses" },
        {
          label: "Create Notice",
          icon: <FaNewspaper />,
          link: "/staff/create-notice",
        },
      ];
      break;
    case "parent":
      sidebarData = [
        {
          label: "Parent Dashboard",
          icon: <FaHome />,
          link: "/parent/dashboard",
        },
        {
          label: "Help",
          icon: <BsFillQuestionCircleFill />,
          link: "/parent/help",
        },
        { label: "Notice", icon: <FaNewspaper />, link: "/parent/notice" },
      ];
      break;
    default:
      sidebarData = [];
  }

  return (
    <div className={styles.sidebar}>
      {sidebarData.map((item, index) => (
        <Link key={index} to={item.link} className={styles.sidebarItem}>
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
