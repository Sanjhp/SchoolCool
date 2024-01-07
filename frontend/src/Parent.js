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

function Parent({ role }) {
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
            <Route path="/parent/notice" element={<Notice />} />
            <Route path="/parent/help" element={<RaiseQuery />} />
            <Route path="/parent/reply" element={<RepliedQuery />} />
            <Route path="/parent/profile" element={<ProfileSettings />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default Parent;
