import logo from '../routes/logo.png'

export default function Header() {
  return (
    <div>
        <nav className="navbar navbar-light" style={{backgroundColor:"#339568"}}>
            <div className="navbar-brand ms-3 px-5 text-light">
              <h1 className="display-6">
                <img src={logo} style={{height:'50px'}} />
              </h1>
            </div>
            <div className='d-flex justify-content-around mx-5' style={{width:'15%'}}>
                <button className='loginBtn'>Login</button>
                <button className='signUpBtn'>SignUp</button>
            </div>
        </nav>
    </div>
  );
}
