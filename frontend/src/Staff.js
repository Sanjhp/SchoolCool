import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Container from "./components/container/container";
import Header from "./components/Header/header";
import Notice from "./components/notice/notice";
import AddNotice from "./components/notice/addNotice";
import ManageAttendance from "./components/manage-attendance/manageAttendance";
import StaffInformation from "./components/staffInformation/staffInformation";
import ManageGrades from "./components/manage-grades/manageGrades";
import StudentInformation from "./components/studentInformation/studentInformation";
import StaffDashboard from "./components/staff-dashboard/staffDashboard";
import QueryReply from "./components/query/queryReply";
import FetchCourse from "./components/course/fetchCourse";

function Staff({ role }) {
  return (
    // Main Content Container
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header role={role} />

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar role={role} />

        {/* Main Content */}
        <Container>
          <Routes>
            <Route path="/staff/notice" element={<Notice />} />
            <Route path="/staff/add-notice" element={<AddNotice />} />
            <Route path="/staff/help" element={<QueryReply />} />
            <Route path="/dashboard" element={<StaffDashboard />} />

            <Route
              path="/staff/staff-information"
              element={<StaffInformation />}
            />
            <Route path="/staff/attendance" element={<ManageAttendance />} />
            <Route path="/staff/grades" element={<ManageGrades />} />
            <Route path="/staff/course" element={<FetchCourse />} />
            <Route
              path="/staff/student-information"
              element={<StudentInformation />}
            />
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default Staff;
