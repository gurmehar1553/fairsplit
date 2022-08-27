import React from 'react'

export default function Dashboard() {
  return (
    <div className='container'>
        <div className='d-flex justify-content-between'>
            <div className='dash-menu w-25'>
                <ul type="none" className=''>
                    <li><h5>Dashboard</h5></li>
                    <li><h5>Recent Activity</h5></li>
                </ul>
            </div>
            <div className='d-flex p-3 btn-div'>
                <button className='btn btn-success mx-3'>Add Expense</button>
                <button className='btn btn-danger mx-3'>Settle Up</button>
            </div>
        </div>
    </div>
  )
}
