import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='container-fluid bg-success bg-opacity-50 p-5'>
        <div className='row'>
            <div className='col-md-6'>
                <Image src='/images/logo.png' fill alt='notFound' />
            </div>
            {/* <div className='col-md-6 d-flex justify-content-around'>
                <p><Link to='/login' style={{textDecoration:"none"}}>Login</Link></p>
                <p><Link to='/signup' style={{textDecoration:"none"}}>Signup</Link></p>
                <p>Password Reset</p>
            </div> */}
        </div>
        <div className='row justify-content-center'>
            <div className='text-center'>
                FairSplit is a web application which helps the users to easily maintain the records of expenses made while 
                travelling among friends or colleagues.
            </div>
            <div className='text-center'>Copyrights ©2022 FairSplit. All rights reserved.</div>
        </div>
    </div>
  )
}

export default Footer;