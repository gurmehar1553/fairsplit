import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useField} from '../hooks/hooks'
import {postLogin, setToken, varifyAuth} from '../serverApi/server'

export default function Login() {

    const inputEmail = useField('email')
    const inputPass = useField('password')
    const navigate = useNavigate()

    async function getAuth(){
        const condition =await varifyAuth()
        console.log("Error -----",condition)
        if(condition){
          navigate('/app')
        }
      }
    
      useEffect(()=>{
        getAuth()
      },[])

    async function handleSubmit(e){
        e.preventDefault()
        const loginData = {
            email: inputEmail.value,
            password: inputPass.value
        } 
        const token = await postLogin(loginData)
        token && setToken(token)
        token && navigate('/app')
    }


    return (
        <div className='login-outer'>
            <div className="p-5 my-5 shadow  col-lg-4 col-xl-3 col-sm-12 col-md-6 main-div bg-opacity-10" id="sign-in">
                <div className="mx-auto col-md-5">
                    <img className="light-mode-item navbar-brand-item" src={logo} alt="logo" style={{ height: '50px' }} />
                </div>
                <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <input type="text" className="form-control" id="username" placeholder="Username" name="username" />
                </div>
                <div className="mb-5">
                    <input type="password" className="form-control" id="pwd" placeholder="Password" name="pswd" />
                </div>
                <div className="form-check mb-4">
                    <label className="form-check-label ">
                        <input className="form-check-input checkbox" type="checkbox" name="remember" /> Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-success w-100 mb-4">Login</button>
                </form>
                <p className="">Create a new account? <Link id="signUpLink" to='/signup'>Sign Up</Link></p>
            </div>
        </div>
    )

}
