import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/login";
import SignupPage from "./components/signup/signup";
import Homepage from "./components/homepage/homepage";
import Student from "./Student";
import Staff from "./Staff";
import Parent from "./Parent";
import Admin from "./Admin";
import Cookies from "js-cookie";

function App() {
  // Use state to manage the role
  const [role, setRole] = useState("undefined");

  useEffect(() => {
    // Fetch the user data from cookies
    const userData = Cookies.get("user");

    if (userData) {
      // Parse the user data JSON
      const user = JSON.parse(userData);

      // Extract the role from the user data
      const userRole = user.parent?.type || "undefined";

      // Set the role in the state
      setRole(userRole);
    }
  }, []); // Empty dependency array to run the effect only once

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
