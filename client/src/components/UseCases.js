import React from 'react'
import travel from '../assets/images/travel.jpg'
import dinner from '../assets/images/dinner.jpg'
import roommates from '../assets/images/roommates.jpg'
import expenseOthers from '../assets/images/expenseOthers.png'

const UseCases = () => {
  return (
    <>
        <div className='m-5 p-5'>

            <h1 className='text-center m-5'>Where To Use</h1>
            <div className='d-flex flex-row flex-wrap m-3 justify-content-around'>
                <div className="card col-md-4 m-3  use-cards" >
                    <img className="card-img-top" src={travel} alt="Card" height="300px" />
                    <div className="card-body">
                        <h2 className="card-title text-success">Love To Travel among friends?</h2>
                        <p className="card-text">
                            Today's youth loves to travel among friends, but doesn't find easy to have a track of 
                            all the travel expense. Need a solution?
                            FairSplit brings the solution to this problem.
                            Easy to handle all the expenditure details including who contributed how much amount for whom. :) 
                        </p>
                    </div>
                </div>
                <div className="card col-md-4 m-3  use-cards" >
                    <img className="card-img-top" src={dinner} alt="Card" height="300px" />
                    <div className="card-body">
                        <h2 className="card-title text-success">
                            Gone For Dinner With Colleagues?
                        </h2>
                        <p className="card-text">
                            Asking for someone's contribution especially from those whom you work with might be sometimes awkward.
                            FairSplit brings the solution to such problems as well. Enter the details of all the expenses for any such
                            outings and add members to your group. They will be reminded of their contribution on their own. :)
                        </p>
                    </div>
                </div>
                <div className="card col-md-4 m-3  use-cards" >
                    <img className="card-img-top" src={roommates} alt="Card" height="300px" />
                    <div className="card-body">
                        <h2 className="card-title text-success">
                            Want to share expenses with your roommates?
                        </h2>
                        <p className="card-text">
                            Now stress less and enjoy more because FairSplit takes care of all your expenses.
                            Want to have equal share in anything you buy for your house or room, just add it to FairSplit 
                            and it will take care of all the details.
                        </p>
                    </div>
                </div>
                <div className="card col-md-4 m-3  use-cards" >
                    <img className="card-img-top" src={expenseOthers} alt="Card" height="300px" />
                    <div className="card-body">
                        <h2 className="card-title text-success">Share expenses with Anyone</h2>
                        <p className="card-text">
                            In a nut-shell, be it anyone whom you want to share your expenses with. FairSplit maintains all the records
                            that you have entered which helps you to enjoy the moment rather than worrying for the expense contribution.:)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UseCases