import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Container from "./components/container/container";
import Header from "./components/Header/header";
import Notice from "./components/notice/notice";
import AddNotice from "./components/notice/addNotice";
import AdminDashboard from "./components/admin-dashboard/adminDashboard";
import ManageAttendance from "./components/manage-attendance/manageAttendance";
import StaffInformation from "./components/staffInformation/staffInformation";
import ManageGrades from "./components/manage-grades/manageGrades";
import StudentInformation from "./components/studentInformation/studentInformation";

function Admin({ role }) {
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
            <Route path="/admin/notice" element={<Notice />} />
            <Route path="/admin/add-notice" element={<AddNotice />} />
            <Route path="/dashboard" element={<AdminDashboard />} />

            <Route
              path="/admin/staff-information"
              element={<StaffInformation />}
            />
            <Route
              path="/admin/manage-attendance"
              element={<ManageAttendance />}
            />
            <Route path="/admin/grades" element={<ManageGrades />} />
            <Route
              path="/admin/student-information"
              element={<StudentInformation />}
            />
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default Admin;
