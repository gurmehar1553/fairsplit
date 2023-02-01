import React from 'react'
import logo from '../assets/images/logo.png'

const Footer = () => {
  return (
    <div className='container-fluid footer p-5'>
        <div className='row'>
            <div className='col-md-6'>
                <img src={logo} height='60px' alt='notFound'/>
            </div>
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