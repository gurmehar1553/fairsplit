import React, {useState} from 'react'
import Toggelable from './Toggelable'
import ExpenseForm from './ExpenseForm'
import MemberAddForm from './MemberAddForm'

export default function Dashboard({members, setMembers, expenses, setExpenses }) {
  
  const [ lenders, setLenders ] = useState([])
  const [ borrowers, setBorrowers ] = useState([])


  return (
    <div className='container-fluid px-0 dashBoard-main'>
        <div className='row m-0'>
          <div className='col-md-4'>
            <div className='btn-div'>
                <Toggelable show='Add Expense' hide='Hide' >
                  <ExpenseForm  
                    setExpenses={setExpenses} 
                    expenses={expenses} 
                    members={members} 
                    lenders={lenders}
                    borrowers={borrowers}
                    setBorrowers={setBorrowers} 
                    setLenders={setLenders}
                  />
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
                {expenses.map((e,i) => {
                  console.log(lenders[i])
                  console.log(borrowers[i])
                  return (
                    <li key={e.id}>Spent Rs.{e.amount} at {e.name} <br/> 
                          &nbsp;&nbsp;&nbsp;-&gt;PaidBy: {lenders[i].join(', ')}<br/> 
                          &nbsp;&nbsp;&nbsp;-&gt;PaidTo: {borrowers[i].join(', ')}
                    </li>
                  )
                })}
              </ul>
            </div>
              
          </div>
        </div>
    </div>
  )
}
