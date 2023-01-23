import {useContext} from 'react';
// import {useNavigate} from 'react-router-dom';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {setToken} from './serverApi/server';
import AuthContext from './utils/AuthProvider';
import Image from 'next/image';

function LogoutBtn(){

  const {setAuth,setUser} = useContext(AuthContext)
  const navigate = useRouter()

  function handleLogout(){
    window.localStorage.removeItem("authToken")
    setAuth(false)
    setUser(null)
    setToken('')
    navigate.push('/')
  }

  return(
    <div className='d-flex flex-wrap justify-content-around mx-5 gap-1'>
        <Link className='loginBtn my-auto' href='/app'>App</Link>
        <Link className='loginBtn my-auto' href='/profile'>Profile</Link>
        <button onClick={handleLogout} className='loginBtn my-auto'>LogOut</button>
    </div>
  )
}

function LoginSignupBtn(){
  return(
    <div className='d-flex flex-wrap justify-content-around mx-5 gap-1'>
        <Link className='loginBtn my-auto' href='/login'>Login</Link>
        <Link className='loginBtn my-auto' href='/signup'>SignUp</Link>
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
                <Link href='/'>
                  {/* <img src={logo} style={{height:'50px'}} alt='notFound' /> */}
                  <Image src="/images/logo.png" fill alt='notFound' />
                </Link>
              </h1>
            </div>
            {auth? <LogoutBtn />:<LoginSignupBtn />}
        </nav>
    </header>
  );
}
