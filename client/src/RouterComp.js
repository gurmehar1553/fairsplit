import React from "react";
import MainBoard from "./routes/MainBoard";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login from "./routes/Login";
import LandingPage from "./routes/LandingPage";
import SignUp from "./routes/SignUp"
import Profile from "./routes/Profile";

function RouterComp() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path='/app' element={<MainBoard/>} exact />
            <Route path="/signup" element={<SignUp />} exact />
            <Route path="/profile" element={<Profile />} exact />
          </Routes>
        </Router>
      </div>
  );
}
export default RouterComp;
