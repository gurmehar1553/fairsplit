import React, {useContext, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useField} from '../hooks/hooks'
import {postLogin, setToken} from '../serverApi/server'
import logo from '../assets/images/logo.png'
import AuthContext from '../utils/AuthProvider'
import NotifyContext from '../utils/Notify'

export default function Login() {

    const inputEmail = useField('email')
    const inputPass = useField('password')
    const [rememberMe,setRememberMe] = useState(false)
    const [showPass,setShowPass] = useState(false)
    const {auth,setAuth,setUser} = useContext(AuthContext)
    const {notify} = useContext(NotifyContext)
    const navigate = useNavigate()
    const location = useLocation()

    if(auth){
        console.log(location.state.path)
    }

    function handleShowPass(e){
        inputPass.ref.current.type = !showPass ? 'type':'password'
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

    async function handleSubmit(e){
        e.preventDefault()
        const redirectPath = location.state?.path || '/'
        const loginData = {
            email: inputEmail.value,
            password: inputPass.value,
            rememberMe
        } 
        const authData = await postLogin(loginData)
        notify(authData.message)
        if(authData.status){
            setToken(authData.token)
            setAuth(true)
            setUser(authData.user)
            navigate(redirectPath, { replace:true })
        }
    }

    return (
        <div className='login-outer row'>
            <div className="p-5 my-5 shadow col-xl-4 col-lg-5 col-sm-10 col-md-6 main-div bg-opacity-10" id="sign-in">
                <div className="mx-auto col-md-5">
                    <img className="light-mode-item navbar-brand-item" src={logo} alt="logo" style={{ height: '50px' }} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <input className="form-control" autoComplete='username' required placeholder="Username" {...inputEmail}/>
                    </div>
                    <div className="mb-5 password-field">
                        <input className="form-control" type="password" autoComplete="current-password" required placeholder="Password" {...inputPass} />
                        <i className="form-check-label m-1 p-2 visibility-button fas fa-eye-slash" onClick={handleShowPass}/>
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
