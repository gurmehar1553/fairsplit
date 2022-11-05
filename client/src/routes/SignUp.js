import React from 'react'
import logo from './logo.png'

export default function SignUp() {
    const showSignIn =()=>{
        // console.log(document.querySelector(".sign-up"))
        document.querySelector(".sign-up").style.left="0px"
        // document.querySelector(".sign-up").style.translateX="100%"
    }

    return (
        <div className='login-outer'>
            <div className="p-5 my-5 shadow col-lg-4 col-sm-12 col-md-6 main-div bg-opacity-10 sign-up">
                <div className="mx-auto col-md-5">
                    <img className="light-mode-item navbar-brand-item" src={logo} alt="logo" style={{ height: '50px' }} />
                </div>
                <h3 className="mt-4 text-center">Create New Account</h3>
                <form >
                <div className="mb-4 mt-3">
                    <input type="text" className="form-control" id="username" placeholder="Username" name="username" />
                </div>
                <div className="mb-4 mt-3">
                    <input type="email" className="form-control" id="email" placeholder="Email" name="email" />
                </div>
                <div className="mb-4">
                    <input type="password" className="form-control" id="pwd" placeholder="Password" name="pswd" />
                </div>
                <div className="mb-4">
                    <input type="password" className="form-control" id="confirm_pwd" placeholder="Confirm Password" name="confirm_pwd" />
                </div>
                <div className="form-check mb-4">
                    <label className="form-check-label ">
                        <input className="form-check-input checkbox" type="checkbox" name="remember" /> Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-success w-100 mb-4">Sign Up</button>
                </form>
                <p className="">Already have an account? <button id="signInLink" onClick={showSignIn}>Sign In</button></p>
            </div>
        </div>
    )
}
