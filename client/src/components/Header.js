import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/images/logo.png'
import {setToken} from '../serverApi/server';
import AuthContext from '../utils/AuthProvider';




function LogoutBtn(){

  const {auth,setAuth,currentUser,setUser} = useContext(AuthContext)

  const navigate = useNavigate()

  function handleLogout(){
    window.localStorage.removeItem("authToken")
    setAuth(false)
    setUser(null)
    setToken('')
    console.log(setAuth)
    console.log(setUser)
    console.log('logged out')
    console.log(currentUser)
    console.log(auth)
    navigate('/')
  }

  return(
    <div className='d-flex justify-content-around mx-5' style={{width:'15%'}}>
        <button onClick={handleLogout} className='loginBtn'>LogOut</button>
        <Link className='btn btn-outline-success' to='/profile'>Your Profile</Link>
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
  const {auth} = useContext(AuthContext)
  return (
    <div>
        <nav className="navbar navbar-light" style={{backgroundColor:"#339568"}}>
            <div className="navbar-brand ms-3 px-5 text-light">
              <h1 className="display-6">
                <img src={logo} style={{height:'50px'}} alt='notFound' />
              </h1>
            </div>
            {auth? <LogoutBtn />:<LoginSignupBtn />}
        </nav>
    </div>
  );
}
