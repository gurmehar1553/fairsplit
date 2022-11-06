import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/images/logo.png'
import AuthContext from '../utils/AuthProvider';




function LogoutBtn({setAuth}){
  const navigate = useNavigate()
  function handleLogout(){
    window.localStorage.removeItem("authToken")
    setAuth(false)
    console.log('logged out')
    navigate('/')
  }
  return(
    <div className='d-flex justify-content-around mx-5' style={{width:'15%'}}>
        <button onClick={handleLogout} className='loginBtn'>LogOut</button>
    </div>
  )
}




function LoginSignupBtn(){
  return(
    <div className='d-flex justify-content-around mx-5' style={{width:'15%'}}>
        <Link className='loginBtn' to='/login'>Login</Link>
        <Link className='signUpBtn' to='/signup'>SignUp</Link>
    </div>
  )
}




export default function Header() {
  const {auth,setAuth} = useContext(AuthContext)
  return (
    <div>
        <nav className="navbar navbar-light" style={{backgroundColor:"#339568"}}>
            <div className="navbar-brand ms-3 px-5 text-light">
              <h1 className="display-6">
                <img src={logo} style={{height:'50px'}} alt='notFound' />
              </h1>
            </div>
            {auth? <LogoutBtn setAuth={setAuth} />:<LoginSignupBtn />}
        </nav>
    </div>
  );
}
