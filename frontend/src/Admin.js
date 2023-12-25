import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/login";
import Sidebar from "./components/sidebar/sidebar";
import Container from "./components/container/container";
import Header from "./components/Header/header";

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
            <Route path="/studentdashboard" element={<LoginPage />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default Admin;
