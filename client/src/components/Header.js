import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/images/logo.png'
import {setToken} from '../serverApi/server';
import AuthContext from '../utils/AuthProvider';

function LogoutBtn(){

  const {setAuth,setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout(){
    window.localStorage.removeItem("authToken")
    setAuth(false)
    setUser(null)
    setToken('')
    navigate('/')
  }

  return(
    <div className='d-flex flex-wrap justify-content-around mx-5 gap-1'>
        <Link className='loginBtn my-auto' to='/app'>App</Link>
        <Link className='loginBtn my-auto' to='/profile'>Profile</Link>
        <button onClick={handleLogout} className='loginBtn my-auto'>LogOut</button>
    </div>
  )
}

function LoginSignupBtn(){
  return(
    <div className='d-flex flex-wrap justify-content-around mx-5 gap-1'>
        <Link className='loginBtn my-auto' to='/login'>Login</Link>
        <Link className='loginBtn my-auto' to='/signup'>SignUp</Link>
    </div>
  )
}

export default function Header() {
  const {auth} = useContext(AuthContext)
  return (
    <header>
        <nav className="navbar navbar-light" style={{backgroundColor:"#339568"}}>
            <div className="navbar-brand ms-3 px-5 text-light">
              <h1 className="display-6">
                <Link to='/'>
                  <img src={logo} style={{height:'50px'}} alt='notFound' />
                </Link>
              </h1>
            </div>
            {auth? <LogoutBtn />:<LoginSignupBtn />}
        </nav>
    </header>
  );
}

