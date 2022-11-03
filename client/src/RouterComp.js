import React, {useState} from "react";
import MainBoard from "./routes/MainBoard";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Login from "./routes/Login";

function RouterComp() {
  const [ authorization, setAuthorization] = useState(false) 
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<>LandingPage</>} />
            <Route path="/login" element={<Login setAuth={setAuthorization} />} />
            <Route element={<MainBoard auth={authorization}/>} path='/app' />
            <Route path="/signup" element={<>signup</>} />
          </Routes>
        </Router>
      </div>
  );
}
export default RouterComp;
