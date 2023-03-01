import React from 'react'
import travel from '../assets/images/travel.webp'
import dinner from '../assets/images/dinner.webp'
import roommates from '../assets/images/roommates.webp'
import expenseOthers from '../assets/images/expenseOthers.webp'

function CardtoUses({src, heading, description}){
    return (
        <div className='col-md-3 p-4'>
            <div className="card use-cards h-100" >
                <img className="card-img-top" src={src} alt="Not Found" />
                <div className="card-body">
                    <h2 className="card-title text-warning">{heading}</h2>
                    <p className="card-text">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

const UseCases = () => {

    const propsToPass = [
        {
            key:'1',
            src:travel,
            heading:'Love To Travel among friends?',
            description:'Splitting money among friends can be a challenging and time-consuming task, but FairSplit makes it easy and fair. This innovative website allows you to quickly and easily split expenses and debts with your friends, ensuring that everyone pays their fair share.',
        },
        {
            key:'2',
            src:dinner,
            heading:'Gone For Dinner With Colleagues?',
            description:`Asking for someone's contribution especially from those whom you work with might be sometimes awkward.
                FairSplit brings the solution to such problems as well. Enter the details of all the expenses for any such
                outings and add members to your group. They will be reminded of their contribution on their own.`,
        },
        {
            key:'3',
            src:roommates,
            heading:'Want to share expenses with your roommates?',
            description:`Now stress less and enjoy more because FairSplit takes care of all your expenses.
                Want to have equal share in anything you buy for your house or room, just add it to FairSplit 
                and it will take care of all the details.`,
        },
        {
            key:'4',
            src:expenseOthers,
            heading:'Share expenses with Anyone',
            description:'Overall, if you\'re looking for a hassle-free way to split money with friends, FairSplit is the perfect solution. Give it a try today and see for yourself how easy and fair it is!',
        },
    ]

  return (
    <>
        <div className='m-3 d-flex flex-column align-items-center justify-content-center'>
            <h1 className='display-2 my-5'>Where To Use</h1>
            <div className='d-flex flex-wrap justify-content-around'>
                {propsToPass.map(e => <CardtoUses {...e} />)}
            </div>
        </div>
    </>
  )
}

export default UseCases