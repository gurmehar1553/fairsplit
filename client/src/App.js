import React from "react";
import MainBoard from "./routes/MainBoard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./routes/Login";
import {CookiesProvider} from "react-cookie";
import SignUp from './routes/SignUp'
import LandingPage from './routes/LandingPage'

function App() {

  return (
    <CookiesProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<MainBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </CookiesProvider>
  );
}
export default App;
