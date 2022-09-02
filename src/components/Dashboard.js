import React from 'react'

export default function Dashboard() {
  return (
    <div className='container-fluid px-0'>
        <div className='row m-0'>
            <div className='col-12 btn-div'>
                <button className='btn btn-success m-2'>Add Expense</button>
                <button className='btn btn-danger m-2'>Settle Up</button>
            </div>
        </div>
    </div>
  )
}
