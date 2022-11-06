import React, {useContext, useState} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {useField} from '../hooks/hooks'
import {postLogin, setToken} from '../serverApi/server'
import logo from '../assets/images/logo.png'
import AuthContext from '../utils/AuthProvider'

export default function Login() {

    const inputEmail = useField('email')
    const inputPass = useField('password')
    const [rememberMe,setRememberMe] = useState(false)

    const navigate = useNavigate()
    const {auth,setAuth} = useContext(AuthContext)
    
    if(auth){
        return <Navigate to='/app'/>
    }

    async function handleSubmit(e){
        e.preventDefault()
        const loginData = {
            email: inputEmail.value,
            password: inputPass.value,
            rememberMe
        } 
        const token = await postLogin(loginData)
        if(token){
            setToken(token)
            setAuth(true)
            navigate('/app')
        }
    }


    return (
        <div className='login-outer'>
            <div className="p-5 my-5 shadow  col-lg-4 col-xl-3 col-sm-12 col-md-6 main-div bg-opacity-10" id="sign-in">
                <div className="mx-auto col-md-5">
                    <img className="light-mode-item navbar-brand-item" src={logo} alt="logo" style={{ height: '50px' }} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <input className="form-control" placeholder="Username" {...inputEmail}/>
                    </div>
                    <div className="mb-5">
                        <input className="form-control" placeholder="Password" {...inputPass} />
                    </div>
                    <div className="form-check mb-4">
                        <label className="form-check-label ">
                            <input onChange={()=>{setRememberMe(!rememberMe)}} className="form-check-input checkbox" type="checkbox" name="remember" /> Remember me
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success w-100 mb-4">Login</button>
                </form>
                <p className="">Create a new account? <Link id="signUpLink" to='/signup'>Sign Up</Link></p>
            </div>
        </div>
    )

}
