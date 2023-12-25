import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./components/login/login";
import SignupPage from "./components/signup/signup";
import Homepage from "./components/homepage/homepage";
import Student from "./Student";
import Staff from "./Staff";
import Parent from "./Parent";
import Admin from "./Admin";

function App() {
  const role = "student"; // Set the role as needed

  return (
    <Router>
      {role === "student" && <Student role={role} />}
      {role === "parent" && <Parent role={role} />}
      {role === "admin" && <Admin role={role} />}
      {role === "staff" && <Staff role={role} />}

      {!role && (
        // If role is not defined, render these routes
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupPage />} />
        </>
      )}
    </Router>
  );
}

export default App;
