import React, {useContext, useEffect, useState} from 'react'
import Toggelable from './Toggelable'
import ExpenseForm from './ExpenseForm'
import MemberAddForm from './MemberAddForm'
import {postResult} from '../serverApi/server'
import AuthContext from '../utils/AuthProvider'

function MainForm(props){
  return(
    <div className='col-md-3'>
      <div className='btn-div'>
          <Toggelable show='Add Expense' hide='Hide' >
            <ExpenseForm {...props}/>
          </Toggelable>
      </div>
      <div className='btn-div'>
          <Toggelable show='Add A Member' hide='Hide' >
            <MemberAddForm setMembers={props.setMembers} members={props.members} />
          </Toggelable>
      </div>
    </div>
  )
}

function EachResult({data}){
  return(
    <div className=''>
      You {data.action? 'lent':'borrowed'} Rs. {data.amount} {data.action? "to":"from"} {data.to}
    </div>
  )
}

function CurrentMembers({members}){
  return(
    <div className='col-md-3'>
        <h3>Current members:</h3>
        <ul className='list-group'>
          {members.map(e => <li className='list-group-item' key={e.id}>{e.name}</li>)}
        </ul>
      </div>
  )
}
function EachExpenseItem({lendersAndBorrowers,expense,index}){
  return(
    <li className='list-group-item'>
      <div className='d-flex flex-column'>
          <div>Spent <strong>Rs.{expense.amt_lent}</strong> at <strong>{expense.name}</strong></div>
          <div className='ms-3'>
            <div><strong>PaidBy</strong>:  {lendersAndBorrowers[index].lenders.join(',  ')}</div>
            <div><strong>PaidTo</strong>:  {lendersAndBorrowers[index].borrowers.join(',  ')}</div>
          </div>
      </div>
    </li>
  )
}
function Expenses({expenses,lendersAndBorrowers}){

  if(expenses.length === 0){
    return(
      <div className='col-md-9'>
        <h3>Expenses:</h3>
        <div className='list-group'>Use the form to add an Expense</div>
      </div>
    )
  }

  return(
    <div className='col-md-9'>
      <h3>Expenses:</h3>
      <ul className='list-group'>
        {expenses.map((e,i) => {
          return (
            <EachExpenseItem key={e.id} lendersAndBorrowers={lendersAndBorrowers} expense={e} index={i}/>
          )
        })}
      </ul>
    </div>
  )
}

export default function Dashboard({members, setMembers, expenses, setExpenses }) {
  
  const {currentUser} = useContext(AuthContext)
  const [lendersAndBorrowers, setlendersAndBorrowers] = useState([])
  const [resultValue, setResultValue] = useState([])

  async function prePostObjectConctatination(){
    const finalData = expenses.map((e,i) => {
      return {...e,...lendersAndBorrowers[i]}
    })
    const reformedData = finalData.map(e => {
      return {...e, lenders:e.lenders[0]}
    })
    const finalDataToSend = [...reformedData,currentUser.username]
    console.log("Final Data",finalDataToSend)
    const ans=await postResult(finalDataToSend)
    console.log(resultValue)
    console.log(ans)
    setResultValue(ans)
  }

  useEffect(()=>{
    
  },[resultValue])

  const props = {
    expenses,
    setExpenses,
    members,
    lendersAndBorrowers,
    setMembers,
    setlendersAndBorrowers,
  }
  
  return (
    <div className='container-fluid px-0 dashBoard-main'>
        <div className='row m-0 shadow p-2'>
          <MainForm {...props} />
          <div className='col-md-9 row'>
            <CurrentMembers members={members} />
            <Expenses expenses={expenses} lendersAndBorrowers={lendersAndBorrowers} />
            <div className='text-center m-3'>
              <button className='btn btn-outline-primary' onClick={prePostObjectConctatination}>
                Calculate
              </button>
            </div>
            {resultValue.map((e,i)=>{
              return(
               <EachResult key={i+"KeyForResultValue"} data={e} />
              )
            })} 
            </div>
          </div>
        </div>
  )
}
