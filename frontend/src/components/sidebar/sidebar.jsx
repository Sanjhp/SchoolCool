// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaNewspaper,
  FaBookReader,
  FaUser,
  FaRegCalendarAlt,
  FaFileAlt,
  FaUsers,
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
          link: "/dashboard",
        },
        {
          label: "Manage Attendance",
          icon: <FaRegCalendarAlt />,
          link: "/admin/manage-attendance",
        },
        {
          label: "Grades",
          icon: <FaBookReader />,
          link: "/admin/grades",
        },
        {
          label: "Course Schedule",
          icon: <FaFileAlt />,
          link: "/admin/course-schedule",
        },
        {
          label: "Notice",
          icon: <FaNewspaper />,
          link: "/admin/notice",
        },
        {
          label: "Add Notice",
          icon: <FaNewspaper />,
          link: "/admin/add-notice",
        },
        {
          label: "Staff Information",
          icon: <FaUsers />,
          link: "/admin/staff-information",
        },
        {
          label: "Student Information",
          icon: <FaUsers />,
          link: "/admin/student-information",
        },
      ];

      break;
    case "student":
      sidebarData = [
        {
          label: "Student Dashboard",
          icon: <FaHome />,
          link: "/dashboard",
        },
        {
          label: "Course",
          icon: <FaFileAlt />,
          link: "/student/course",
        },
        {
          label: "Student Profile",
          icon: <FaBookReader />,
          link: "/student/profile",
        },
        {
          label: "Notice",
          icon: <FaNewspaper />,
          link: "/student/notice",
        },
        {
          label: "Raise Query",
          icon: <BsFillQuestionCircleFill />,
          link: "/student/help",
        },
        {
          label: "Query Reply",
          icon: <BsFillQuestionCircleFill />,
          link: "/student/reply",
        },
      ];
      break;
    case "staff":
      sidebarData = [
        {
          label: "Staff Dashboard",
          icon: <FaHome />,
          link: "/dashboard",
        },
        {
          label: "Grades",
          icon: <FaBookReader />,
          link: "/staff/grades",
        },
        {
          label: "Attendance",
          icon: <FaRegCalendarAlt />,
          link: "/staff/attendance",
        },
        {
          label: "Student Information",
          icon: <FaUsers />,
          link: "/staff/student-information",
        },
        // {
        //   label: "Course",
        //   icon: <FaFileAlt />,
        //   link: "/staff/course",
        // },
        {
          label: "Help",
          icon: <BsFillQuestionCircleFill />,
          link: "/staff/help",
        },
        {
          label: "Notice",
          icon: <FaNewspaper />,
          link: "/staff/notice",
        },
        {
          label: "Add Notice",
          icon: <FaNewspaper />,
          link: "/staff/add-notice",
        },
      ];

      break;
    case "parent":
      sidebarData = [
        {
          label: "Parent Dashboard",
          icon: <FaHome />,
          link: "/dashboard",
        },
        {
          label: "Profile",
          icon: <FaBookReader />,
          link: "/parent/profile",
        },
        {
          label: "Notice",
          icon: <FaNewspaper />,
          link: "/parent/notice",
        },
        {
          label: "Raise Query",
          icon: <BsFillQuestionCircleFill />,
          link: "/parent/help",
        },
        {
          label: "Query Reply",
          icon: <BsFillQuestionCircleFill />,
          link: "/parent/reply",
        },
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
