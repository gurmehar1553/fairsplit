import React from 'react'
import MemberAddForm from './MemberAddForm'

export default function GroupsForm() {

    return (
        <div className=''>
            <div className="p-5 my-5 shadow  col-lg-4 col-xl-3 col-sm-12 col-md-6 bg-opacity-10">
                <div className='text-center'>
                    <h1>
                        Enter Group Details
                    </h1>
                </div>
                <div className='btn-div'>
                    <MemberAddForm />
                </div>
            </div>
        </div>
  )
}
