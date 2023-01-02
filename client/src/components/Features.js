import React from 'react'
import NewGroup from '../assets/images/NewGroup.png'
import NewExpense from '../assets/images/NewExpense.png'
import YourExpense from '../assets/images/YourExpense.png'
import debtFree from '../assets/images/debtFree.png'

const Features = () => {
  return (
    <div className='m-5 p-5 shadow ' id="features" >
        <h1 className='text-center'>How To Use?</h1>
        <div className='row p-5 feature-main'>
            <div className='col-md-6 p-5 ' height="400px" >
                <h1 className='my-3'>Create your Group</h1>
                <p className='my-5 bg-warning bg-opacity-10 p-5'>
                    If you want to go to a tour with friends or family and want equal contribution of expenses by each person,
                    the first choice should be FairSplit. You can create your group conveniently and add as many members as you wish.

                </p>
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
                    <h1>Add Expenses Made By Individuals</h1>
                    <p className='my-5 bg-warning bg-opacity-10 p-5'>
                        If you visit different places or eateries and want to make record of the expenses made,
                        you can easily add expenses made by each person in different places and keep a track of it</p>
                </div>
            </div>
        </div>
        <div>
            <div className='row p-5 feature-main'>
                <div className='col-md-6  p-5' height="400px">
                    <h1>Easy Access to Your Debts and all Expenses</h1>
                    <p className='my-5 bg-warning bg-opacity-10 p-5'>You can view your debts for a certain destination in a certain group to a certain member anytime according to your convenience</p>
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
                    <h1>Find and Clear Your Debts</h1>
                    <p className='my-5 bg-warning bg-opacity-10 p-5'>Finally, after clearing your debts FairSplit clears your record and you are sorted!</p>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Features