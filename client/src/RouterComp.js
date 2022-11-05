import React from "react";
import MainBoard from "./routes/MainBoard";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login from "./routes/Login";

function RouterComp() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<>LandingPage</>} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path='/app' element={<MainBoard/>} exact />
            <Route path="/signup" element={<>signup</>} exact />
          </Routes>
        </Router>
      </div>
  );
}
export default RouterComp;
