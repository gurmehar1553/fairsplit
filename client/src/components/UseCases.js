import React from 'react'
import travel from '../assets/images/travel.jpg'
import dinner from '../assets/images/dinner.jpg'
import roommates from '../assets/images/roommates.jpg'
import expenseOthers from '../assets/images/expenseOthers.png'

const UseCases = () => {
  return (
    <>
        <div className='m-3 p-5'>

            <h1 className='text-center'>Where To Use</h1>
            <div className='d-flex flex-row flex-wrap m-3 justify-content-around'>
                <div className="card col-md-4 m-3  use-cards" >
                    <img className="card-img-top" src={travel} alt="Card" height="300px" />
                    <div className="card-body">
                        <h2 className="card-title text-warning">Love To Travel among friends?</h2>
                        <p className="card-text p-3">
                        Splitting money among friends can be a challenging and time-consuming task, but FairSplit makes it easy and fair. This innovative website allows you to quickly and easily split expenses and debts with your friends, ensuring that everyone pays their fair share.
                        </p>
                    </div>
                </div>
                <div className="card col-md-4 m-3  use-cards" >
                    <img className="card-img-top" src={dinner} alt="Card" height="300px" />
                    <div className="card-body">
                        <h2 className="card-title text-warning">
                            Gone For Dinner With Colleagues?
                        </h2>
                        <p className="card-text p-3">
                            Asking for someone's contribution especially from those whom you work with might be sometimes awkward.
                            FairSplit brings the solution to such problems as well. Enter the details of all the expenses for any such
                            outings and add members to your group. They will be reminded of their contribution on their own. :)
                        </p>
                    </div>
                </div>
                <div className="card col-md-4 m-3  use-cards" >
                    <img className="card-img-top" src={roommates} alt="Card" height="300px" />
                    <div className="card-body">
                        <h2 className="card-title text-warning">
                            Want to share expenses with your roommates?
                        </h2>
                        <p className="card-text p-3">
                            Now stress less and enjoy more because FairSplit takes care of all your expenses.
                            Want to have equal share in anything you buy for your house or room, just add it to FairSplit 
                            and it will take care of all the details.
                        </p>
                    </div>
                </div>
                <div className="card col-md-4 m-3  use-cards" >
                    <img className="card-img-top" src={expenseOthers} alt="Card" height="300px" />
                    <div className="card-body">
                        <h2 className="card-title text-warning">Share expenses with Anyone</h2>
                        <p className="card-text p-3">
                        Overall, if you're looking for a hassle-free way to split money with friends, FairSplit is the perfect solution. Give it a try today and see for yourself how easy and fair it is!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UseCases