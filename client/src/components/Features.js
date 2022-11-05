import React from 'react'
import heroImg from '../routes/images/heroImg.png'
import bg from '../routes/images/bg.jpg'

const Features = () => {
  return (
    <div className='container m-5 p-5 shadow feature-main' >
        <div className='row p-5 '>
            <div className='col-md-6 bg-success p-5' height="400px">
                <h1 className='text-success'>Create your Group</h1>
                <h4>
                    Create a group and add friends to it.
                </h4>
            </div>
            <div className='col-md-6'>
                <img src={heroImg} />
            </div>
        </div>
        <div>
            <div className='row p-5 '>
                <div className='col-md-6'>
                    <img src={heroImg} />
                </div>
                <div className='col-md-6  p-5' height="400px">
                    <h1 className='text-success'>Add Expenses Made By Individuals</h1>
                    <h4>Now you can easily add expenses made by each person and keep a track of it</h4>
                </div>
            </div>
        </div>
        <div>
            <div className='row p-5 '>
                <div className='col-md-6  p-5' height="400px">
                    <h1 className='text-success'>Easy Access to Your Debts and all Expenses</h1>
                    <h4>You can anytime view your debts</h4>
                </div>
                <div className='col-md-6'>
                    <img src={heroImg} />
                </div>
            </div>
        </div>
        <div>
            <div className='row p-5 '>
                <div className='col-md-6'>
                    <img src={heroImg} />
                </div>
                <div className='col-md-6  p-5' height="400px">
                    <h1 className='text-success'>Find and Clear Your Debts</h1>
                    <h4>Finally after clearing your debts you are sorted!!</h4>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Features