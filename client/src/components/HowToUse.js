import React from 'react'
function HowToUseCard({heading , description}){

    return(
        <div style={{backgroundColor:'#655645'}} className='col-10 col-md-5 py-2 shadow rounded'>
            <h2 className='text-center text-md-start text-warning'>{heading}</h2>
            <p className='my-5'>{description}</p>
        </div>
    )
}

const HowToUse = () => {

    const propsToPass=[
        {
            // src: NewGroup,
            // left: false,
            key:'1',
            heading:'Create your Group',
            description:`If you want to go to a tour with friends or family and want equal contribution of expenses by each person,
                    the first choice should be FairSplit. You can create your group conveniently and add as many members as you wish.`,
        },
        {
            // src: NewExpense,
            // left: true,
            key:'2',
            heading:'Add Expenses Made By Individuals',
            description:`If you visit different places or eateries and want to make record of the expenses made,
                    you can easily add expenses made by each person in different places and keep a track of it`,
        },
        {
            // src: YourExpense,
            // left: false,
            key:'3',
            heading:'Easy Access to Your Debts and all Expenses',
            description:`You can view your debts for a certain destination in a certain group to a certain member anytime according to your convenience`,
        },
        {
            // src: debtFree,
            // left: true,
            key:'4',
            heading:'Find and Clear Your Debts',
            description:'Finally, after clearing your debts FairSplit clears your record and you are sorted!',
        }
    ]

  return (
    <div className='py-4' id="features" >
        <h1 className='display-2 text-center'>How To Use?</h1>
        <div className='row justify-content-center gap-4 my-3'>
            {propsToPass.map(e => <HowToUseCard {...e} />)}
        </div>
    </div>
  )
}
export default HowToUse