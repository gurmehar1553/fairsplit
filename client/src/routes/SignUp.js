import React, {useContext, useState} from 'react'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useField } from '../hooks/hooks'
import {postSignUp, sendOTP} from '../serverApi/server'
import NotifyContext from '../utils/Notify'


export default function SignUp() {

    const inputUsername = useField('text')
    const {onChange,...inputEmail} = useField('email')
    const inputPassword = useField('password')
    const inputConfirmPassword = useField('password')
    const inputOTP = useField('number')
    const [showPass,setShowPass] = useState(false)
    const [showPassConfirmed,setShowPassConfirmed] = useState(false)
    const [otpStatus,setOTPStatus] = useState(false)
    const {notify} = useContext(NotifyContext)

    const navigate = useNavigate()

    const nullCondition = otpStatus && inputUsername.value && inputPassword.value && inputEmail.value && inputConfirmPassword.value && inputOTP.value

    function handleEmailOnChange(e){
        setOTPStatus(false)
        onChange(e)
    }

    function handleShowPass(e){
        inputPassword.ref.current.type = !showPass ? 'type':'password'
        const classListHere = e.target.classList
        if (classListHere.contains('fa-eye')) {
            classListHere.remove('fa-eye')
            classListHere.add('fa-eye-slash')
        } else {
            classListHere.remove('fa-eye-slash')
            classListHere.add('fa-eye')
        }
        setShowPass(!showPass)
    }

    function handleShowPassConfirmed(e){
        inputConfirmPassword.ref.current.type = !showPassConfirmed ? 'type':'password'
        const classListHere = e.target.classList
        if (classListHere.contains('fa-eye')) {
            classListHere.remove('fa-eye')
            classListHere.add('fa-eye-slash')
        } else {
            classListHere.remove('fa-eye-slash')
            classListHere.add('fa-eye')
        }
        setShowPassConfirmed(!showPassConfirmed)
    }

    async function handleSendOTP(){
        if(!inputEmail.value){
            console.log('Dont send empty mails')
            return
        }
        const SendingMail = {
            email:inputEmail.value,
        }
        const res = await sendOTP(SendingMail)
        if (res.status==='PENDING'){
            setOTPStatus(true)
        }
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

        const res = await postSignUp(signUpData)
        notify(res.message)
        if(res.status){
            navigate('/login', { replace:true })
        }
    }

    return (
        <div className='login-outer row'>
            <div className="p-5 my-5 shadow col-xl-4 col-lg-5  col-sm-10 col-md-6 main-div bg-opacity-10 sign-up">
                <div className="mx-auto col-md-5">
                    <img className="light-mode-item navbar-brand-item" src={logo} alt="logo" style={{ height: '50px' }} />
                </div>
                <h3 className="mt-4 text-center">Create New Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-3">
                        <input className="form-control" required placeholder="Username" {...inputUsername} />
                    </div>
                    <div className="mb-4 mt-3">
                        <input onChange={handleEmailOnChange} className="form-control" required placeholder="Email" {...inputEmail} />
                    </div>
                    <div className='mb-4 mt-3'>
                        <button disabled={otpStatus} className='btn btn-outline-success' type='button' onClick={handleSendOTP}>
                            {otpStatus ?'sent':'Send OTP'}
                        </button>
                    </div>
                    <div className="mb-4">
                        <input className="form-control" required placeholder="OTP" {...inputOTP} />
                    </div>
                    <div className="mb-4 password-field">
                        <input className="form-control" required placeholder="Password" {...inputPassword} />
                        <i className="form-check-label m-1 p-2 visibility-button fas fa-eye-slash" onClick={handleShowPass}/>
                    </div>
                    <div className="mb-4 password-field">
                        <input className="form-control" required placeholder="Confirm Password" {...inputConfirmPassword} />
                        <i className="form-check-label m-1 p-2 visibility-button fas fa-eye-slash" onClick={handleShowPassConfirmed}/>
                    </div>
                    <button type="submit" className={`btn btn-success ${!nullCondition && 'disabled'} w-100 mb-4`}>
                        Sign Up
                    </button>
                </form>
                <p className="">Already have an account? <Link id="signInLink" to='/login'>Login</Link></p>
            </div>
        </div>
    )
}
