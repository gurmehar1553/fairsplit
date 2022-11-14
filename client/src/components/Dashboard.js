import React, {useEffect, useState} from 'react'
import Toggelable from './Toggelable'
import ExpenseForm from './ExpenseForm'
import MemberAddForm from './MemberAddForm'
import {postResult} from '../serverApi/server'

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
      Jastagar {data.action? 'lent':'borrowed'} Rs. {data.amount} {data.action? "to":"from"} {data.to}
    </div>
  )
}

export default function Dashboard({members, setMembers, expenses, setExpenses }) {
  
  const [ lendersAndBorrowers, setlendersAndBorrowers ] = useState([])
  const [resultValue, setResultValue] = useState([])

  async function prePostObjectConctatination(){
    const finalData = expenses.map((e,i) => {
      return {...e,...lendersAndBorrowers[i]}
    })
    const reformedData = finalData.map(e => {
      return {...e, lenders:e.lenders[0]}
    })
    // console.log("Final Data",[...reformedData,"Jastagar"])
    const ans=await postResult([...reformedData,"Jastagar"])
    // console.log(resultValue)
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

            <div className='col-md-3'>
              <h3>Current members:</h3>
              <ul className='list-group'>
                {members.map(e => <li className='list-group-item' key={e.id}>{e.name}</li>)}
              </ul>
            </div>

            <div className='col-md-9'>
              <h3>Expenses:</h3>
              <ul className='list-group'>
                {expenses.map((e,i) => {
                  return (
                    <li className='list-group-item' key={e.id}>Spent <strong>Rs.{e.amt_lent}</strong> at <strong>{e.name}</strong> <br/> 
                          &nbsp;&nbsp;&nbsp;-&gt;PaidBy: {lendersAndBorrowers[i].lenders.join(', ')}<br/> 
                          &nbsp;&nbsp;&nbsp;-&gt;PaidTo: {lendersAndBorrowers[i].borrowers.join(', ')}
                    </li>
                  )
                })}
              </ul>
            </div>

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
    </div>
  )
}
