import React from 'react'

function TeamMemberCard({src,name,description}){
    return(
        <div className="col-11 col-md-5 my-4 shadow" >
            <div className='card use-cards'>
                <img className="card-img-top" src={src} alt="Card" height="300px" />
                <div className="card-body">
                    <h2 className="card-title text-warning">
                        {name}
                    </h2>
                    <p className="card-text">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

const Team = () => {
    const propsToPass =[
        {   
            key:'JastagarCard',
            src:'',
            name:'Jastagar Singh Brar',
            description:`Asking for someone's contribution especially from those whom you work with might be sometimes awkward.
                FairSplit brings the solution to such problems as well. Enter the details of all the expenses for any such
                outings and add members to your group. They will be reminded of their contribution on their own.`,
        },
        {
            key:'GurmeharCard',
            src:'',
            name:'Gurmehar Kaur',
            description:`Asking for someone's contribution especially from those whom you work with might be sometimes awkward.
                FairSplit brings the solution to such problems as well. Enter the details of all the expenses for any such
                outings and add members to your group. They will be reminded of their contribution on their own.`,
        },
    ]
  return (
    <>
        <div>
            <h1 className='text-center display-3'>Meet Our Team</h1>
            <div className='row justify-content-center'>
                {propsToPass.map(e => <TeamMemberCard {...e}/>)}
            </div>
        </div>
    </>
  )
}

export default Team