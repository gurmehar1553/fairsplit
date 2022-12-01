import React, {useContext} from "react";
import MainBoard from "./routes/MainBoard";
import { BrowserRouter as Router,Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from "./routes/Login";
import LandingPage from "./routes/LandingPage";
import SignUp from "./routes/SignUp"
import Profile from "./routes/Profile";
import GroupsForm from "./components/GroupsForm";
import AuthContext from "./utils/AuthProvider";

function PrivateRoutes(){
  const {auth} = useContext(AuthContext);
  console.log(auth)
  return auth ? <Outlet />: <Navigate to='/login' />
}


function RouterComp() {
  
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/app' element={<MainBoard/>} exact />
              <Route path="/profile" element={<Profile />} exact />
              <Route path="/groupsform" element={<GroupsForm />} exact />
            </Route>
            <Route path="/" element={<LandingPage/>} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<SignUp />} exact />
          </Routes>
        </Router>
      </div>
  );
}
export default RouterComp;
