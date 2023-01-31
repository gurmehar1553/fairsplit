import React, {useContext} from "react";
import MainBoard from "./routes/MainBoard";
import { BrowserRouter as Router,Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import Login from "./routes/Login";
import LandingPage from "./routes/LandingPage";
import SignUp from "./routes/SignUp"
import Profile from "./routes/Profile";
import GroupsForm from "./components/GroupsForm";
import AuthContext from "./utils/AuthProvider";
import Buffering from "./components/Buffering";

function PrivateRoutes(){
  const location = useLocation()
  const {auth,authLoading} = useContext(AuthContext);

  if(authLoading){
    return <Buffering/>
  }
  return auth ? <Outlet />: <Navigate to='/login' state={{ path: location.pathname}}  replace />
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
