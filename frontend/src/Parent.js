import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/login";
import Sidebar from "./components/sidebar/sidebar";
import Container from "./components/container/container";
import Header from "./components/Header/header";

function Parent({ role }) {
  return (
    // Main Content Container
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header id="header" />

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar role={role} id="sidebar" />

        {/* Main Content */}
        <Container id="container">
          <Routes>
            <Route path="/studentdashboard" element={<LoginPage />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default Parent;
