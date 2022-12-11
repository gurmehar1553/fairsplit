import React from 'react'
import heroImg from '../assets/images/heroImg.png'
import NewGroup from '../assets/images/NewGroup.png'
import NewExpense from '../assets/images/NewExpense.png'
import YourExpense from '../assets/images/YourExpense.png'
import debtFree from '../assets/images/debtFree.png'

const Features = () => {
  return (
    <div className='m-5 p-5 shadow bg-success bg-opacity-10' id="features" >
        <div className='row p-5 feature-main'>
            <div className='col-md-6 p-5 ' height="400px" >
                <h1 className='text-success my-3'>Create your Group</h1>
                <h4 className='my-5'>
                    If you want to go to a tour with friends or family and want equal contribution of expenses by each person,
                    the first choice should be FairSplit. You can create your group conveniently and add as many members as you wish.

                </h4>
            </div>
            <div className='col-md-6'>
                <img src={NewGroup} width='100%' alt='NotFound' />
            </div>
        </div>
        <div>
            <div className='row p-5 feature-white'>
                <div className='col-md-6'>
                    <img src={NewExpense} width='100%' alt='NotFound' />
                </div>
                <div className='col-md-6  p-5' height="400px">
                    <h1 className='text-success'>Add Expenses Made By Individuals</h1>
                    <h4 className='my-5'>
                        If you visit different places or eateries and want to make record of the expenses made,
                        you can easily add expenses made by each person in different places and keep a track of it</h4>
                </div>
            </div>
        </div>
        <div>
            <div className='row p-5 feature-main'>
                <div className='col-md-6  p-5' height="400px">
                    <h1 className='text-success'>Easy Access to Your Debts and all Expenses</h1>
                    <h4 className='my-5'>You can view your debts for a certain destination in a certain group to a certain member anytime according to your convenience</h4>
                </div>
                <div className='col-md-6'>
                    <img src={YourExpense} width='100%' alt='NotFound' />
                </div>
            </div>
        </div>
        <div>
            <div className='row p-5 feature-white'>
                <div className='col-md-6'>
                    <img src={debtFree} width='100%' alt='NotFound' />
                </div>
                <div className='col-md-6  p-5' height="400px">
                    <h1 className='text-success'>Find and Clear Your Debts</h1>
                    <h4 className='my-5'>Finally, after clearing your debts FairSplit clears your record and you are sorted!</h4>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Features