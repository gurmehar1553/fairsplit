import React from 'react'

const Team = () => {
  return (
    <>
        <div>
            <h1 className='text-center'>Meet Our Team</h1>
            <div className='d-flex justify-content-around'>
                <div className="card col-md-3 m-3  use-cards" >
                        <img className="card-img-top" src="" alt="Card" height="300px" />
                        <div className="card-body">
                            <h2 className="card-title text-warning">
                                Jastagar Singh Brar
                            </h2>
                            <p className="card-text">
                                Asking for someone's contribution especially from those whom you work with might be sometimes awkward.
                                FairSplit brings the solution to such problems as well. Enter the details of all the expenses for any such
                                outings and add members to your group. They will be reminded of their contribution on their own. :)
                            </p>
                        </div>
                    </div>
                <div className="card col-md-3 m-3  use-cards" >
                        <img className="card-img-top" src="" alt="Card" height="300px" />
                        <div className="card-body">
                            <h2 className="card-title text-warning">
                                Gurmehar Kaur
                            </h2>
                            <p className="card-text">
                                Asking for someone's contribution especially from those whom you work with might be sometimes awkward.
                                FairSplit brings the solution to such problems as well. Enter the details of all the expenses for any such
                                outings and add members to your group. They will be reminded of their contribution on their own. :)
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default Team