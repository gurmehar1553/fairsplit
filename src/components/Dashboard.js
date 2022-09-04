import React from 'react'
import Toggelable from './Toggelable'
import ExpenseForm from './ExpenseForm'
import MemberAddForm from './MemberAddForm'

export default function Dashboard({members, setMembers, expenses, setExpenses}) {
  return (
    <div className='container-fluid px-0 dashBoard-main'>
        <div className='row m-0'>
          <div className='col-md-4'>
            <div className='btn-div'>
                <Toggelable show='Add Expense' hide='Hide' >
                  <ExpenseForm  setExpenses={setExpenses} expenses={expenses} />
                </Toggelable>
            </div>
            <div className='btn-div'>
                <Toggelable show='Add A Member' hide='Hide' >
                  <MemberAddForm setMembers={setMembers} members={members} />
                </Toggelable>
            </div>
          </div>
          <div className='col-md-8 row'>
            <div className='col-4'>
              Current members:
              <ul>
                {members.map(e => <li key={e.id}>{e.name}</li>)}
              </ul>
            </div>
            <div className='col-8'>
              Expenses:
              <ul>
                {expenses.map(e => <li key={e.id}>Spent {e.amount} at {e.name}</li>)}
              </ul>
            </div>
              
          </div>
        </div>
    </div>
  )
}
