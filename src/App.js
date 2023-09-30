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
          <Route path="/" />
          <Route
            path="/email/confirm/:UserName/:ConfirmToken"
            element={<EmailConfirm />}
          />
          <Route
            path="/password/change/:UserName/:resetToken"
            element={<PasswordReset />}
          />
          <Route
            path="/email/change/:UserName/:Email/:resetToken"
            element={<EmailReset />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
