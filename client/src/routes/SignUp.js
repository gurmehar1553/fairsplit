import React from 'react'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useField } from '../hooks/hooks'
import {postSignUp, sendOTP} from '../serverApi/server'


export default function SignUp() {

    const inputUsername = useField('text')
    const inputEmail = useField('email')
    const inputPassword = useField('password')
    const inputConfirmPassword = useField('password')
    const inputOTP = useField('number')

    const navigate = useNavigate()

    async function handleSendOTP(){
        if(!inputEmail.value){
            console.log('Dont send empty mails')
            return
        }
        const SendingMail = {
            email:inputEmail.value,
        }
        const res = await sendOTP(SendingMail)
        console.log(res)
    }
    async function handleSubmit(e){
        e.preventDefault()

        if(inputConfirmPassword.value !== inputPassword.value) return

        const signUpData = {
            username: inputUsername.value,
            email:inputEmail.value,
            otp:inputOTP.value,
            password:inputPassword.value
        }

        const result = await postSignUp(signUpData)
        console.log(result)
        if(result){
            navigate('/login')
        }else{
            console.log('Cannot create a new user')
        }
    }

    return (
        <div className='login-outer'>
            <div className="p-5 my-5 shadow col-lg-4 col-xl-3 col-sm-12 col-md-6 main-div bg-opacity-10 sign-up">
                <div className="mx-auto col-md-5">
                    <img className="light-mode-item navbar-brand-item" src={logo} alt="logo" style={{ height: '50px' }} />
                </div>
                <h3 className="mt-4 text-center">Create New Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-3">
                        <input className="form-control" required placeholder="Username" {...inputUsername} />
                    </div>
                    <div className="mb-4 mt-3">
                        <input className="form-control" required placeholder="Email" {...inputEmail} />
                    </div>
                    <div className='mb-4 mt-3'>
                        <button className='btn btn-outline-success' type='button' onClick={handleSendOTP}>Send OTP</button>
                    </div>
                    <div className="mb-4">
                        <input className="form-control" required placeholder="OTP" {...inputOTP} />
                    </div>
                    <div className="mb-4">
                        <input className="form-control" required placeholder="Password" {...inputPassword} />
                    </div>
                    <div className="mb-4">
                        <input className="form-control" required placeholder="Confirm Password" {...inputConfirmPassword} />
                    </div>
                    <button type="submit" className="btn btn-success w-100 mb-4">Sign Up</button>
                </form>
                <p className="">Already have an account? <Link id="signInLink" to='/login'>Login</Link></p>
            </div>
        </div>
    )
}
