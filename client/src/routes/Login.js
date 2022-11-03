import React,{useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useField} from '../hooks/hooks'
import {postLogin,varifyAuth} from '../serverApi/server'

export default function Login({setAuth}) {
    
    
    const inputEmail = useField('email')
    const inputPass = useField('password')
    const navigate = useNavigate()
  
    async function verify(){
      const status = await varifyAuth()
      if(status){
        setAuth(true)
        navigate("/app")
      }else{
        console.log('not Authorized')
      }
    }
  
    useEffect(()=>{
        verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function handleSubmit(e){
        e.preventDefault()
        const loginData = {
            email: inputEmail.value,
            password: inputPass.value
        } 
        const authData = await postLogin(loginData)
        authData && navigate('/app')
    }
    
    
    //   useEffect(()=>{
    //       verify()? setAuthentication(true):setAuthentication(false)
    //       verify()
    //   },[])


    return (
    <div className='LoginOuterWrap h-100 container'>
        <div className='row h-100 justify-content-center align-items-center'>
            <div className='col-md-4'>
                <form className='form-control p-4 my-2' onSubmit={handleSubmit}>
                    <label htmlFor='emailLogin'>Registered Email:</label>
                    <input className='form-control my-2' id='emailLogin' {...inputEmail} required/>
                    <label htmlFor='passwordLogin'>Your Password:</label>
                    <input className='form-control my-2' id='passwordLogin' {...inputPass} required/>
                    <button type='submit' className='btn btn-primary mx-2 submitLogin'>Login In</button>
                    <Link className='btn btn-warning mx-2' to='/signup'>Sign Up</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
