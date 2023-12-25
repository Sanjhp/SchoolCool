import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/login";
import SignupPage from "./components/signup/signup";
import Homepage from "./components/homepage/homepage";
import Student from "./Student";
import Staff from "./Staff";
import Parent from "./Parent";
import Admin from "./Admin";

function App() {
  const role = "admin"; // Set the role as needed

  return (
    <Router>
      {role === "student" && <Student role={role} />}
      {role === "parent" && <Parent role={role} />}
      {role === "admin" && <Admin role={role} />}
      {role === "staff" && <Staff role={role} />}

      {role === "undefined" && (
        // If role is not defined, render these routes
        <>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
