import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/images/logo.webp'
import {setToken} from '../serverApi/server';
import AuthContext from '../utils/AuthProvider';

function LogoutBtns(){

  const {setAuth,setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout(){
    window.localStorage.removeItem("authToken")
    setAuth(false)
    setUser(null)
    setToken('')
    navigate('/', { replace:true })
  }

  return(
    <>
      <Link className='loginBtn my-auto' to='/app'>App</Link>
      <Link className='loginBtn my-auto' to='/profile'>Profile</Link>
      <button onClick={handleLogout} className='loginBtn my-auto'>LogOut</button>
    </>
  )
}

function LoginSignupBtns(){
  return(
    <>
      <Link className='loginBtn my-auto' to='/login'>Login</Link>
      <Link className='loginBtn my-auto' to='/signup'>SignUp</Link>
    </>
  )
}

export default function Header() {
  const {auth} = useContext(AuthContext)
  return (
    <header>
        <nav className="navbar navbar-light d-flex justify-content-center" style={{backgroundColor:"#2a251f"}}>
            <div className="text-light text-center text-md-start my-2">
              <Link to='/'>
                <img src={logo} height='50px' alt='notFound' />
              </Link>
            </div>
            <div className='d-flex flex-wrap justify-content-around mx-5 gap-1'>
              {auth? <LogoutBtns />:<LoginSignupBtns />}
            </div>
        </nav>
    </header>
  );
}

