import React from 'react'
import logo from '../assets/images/logo.webp'

const Footer = () => {
  return (
    <div className='container-fluid footer p-5'>
        <div className='row justify-content-center'>
            <div className='col-md-6 text-center'>
                <img src={logo} width='125px' height='50px' alt='notFound'/><br/><br/>
                FairSplit is a web application which helps the users to easily maintain the records of expenses made while 
                travelling among friends or colleagues.<br/>
                Copyrights ©2022 FairSplit. All rights reserved.
            </div>
        </div>
    </div>
  )
}

export default Footer;