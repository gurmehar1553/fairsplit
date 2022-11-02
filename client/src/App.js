import React from "react";
import MainBoard from "./routes/MainBoard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<>LandingPage</>} />
          <Route path="/app" element={ <MainBoard />} />
          <Route path="/login" element={<>login</>} />
          <Route path="/signup" element={<>signup</>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
