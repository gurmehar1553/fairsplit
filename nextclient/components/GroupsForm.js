import React from 'react'
import Header from './Header'
import MemberAddForm from './MemberAddForm'

export default function GroupsForm() {

    return (
        <div>
            <Header />
            <div className='d-flex justify-content-center'>
                <div className="p-5 my-5 shadow col-sm-12 col-md-6 bg-opacity-10">
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
        </div>
  )
}
