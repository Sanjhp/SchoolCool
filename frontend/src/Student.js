import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Container from "./components/container/container";
import Header from "./components/Header/header";
import Notice from "./components/notice/notice";
import RaiseQuery from "./components/query/raiseQuery";
import Dashboard from "./components/dashboardParent/dashboard";
import ProfileSettings from "./components/profileSettings/profileSettings";
import RepliedQuery from "./components/query/repliedQuery";
import FetchCourse from "./components/course/fetchCourse";

function Student({ role }) {
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student/notice" element={<Notice />} />
            <Route path="/student/help" element={<RaiseQuery />} />
            <Route path="/student/course" element={<FetchCourse />} />
            <Route path="/student/reply" element={<RepliedQuery />} />
            <Route path="/student/profile" element={<ProfileSettings />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default Student;
