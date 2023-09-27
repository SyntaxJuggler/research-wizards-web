import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmailConfirm from "./Pages/EmailConfirm/EmailConfirm.jsx";
import PasswordReset from "./Pages/PasswordReset/PasswordReset";
import EmailReset from "./Pages/EmailReset/EmailReset";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route
            path="/EmailConfirm/:UserName/:ConfirmToken"
            element={<EmailConfirm />}
          />
          <Route
            path="/ResetPassword/:UserName/:resetToken"
            element={<PasswordReset />}
          />
          <Route
            path="/EmailReset/:UserName/:Email/:resetToken"
            element={<EmailReset />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
