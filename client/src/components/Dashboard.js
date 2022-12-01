import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import Toggelable from './Toggelable'
import ExpenseForm from './ExpenseForm'
import {deleteGroupReq, getGroupData, postResult} from '../serverApi/server'
import AuthContext from '../utils/AuthProvider'

function MainForm({groups,setGroup,...props}){
  return(
    <div className='col-md-3'>
      <div className='btn-div'>
          <Toggelable show='Add Expense' hide='Hide' >
            <ExpenseForm {...props} setGroup={setGroup}/>
          </Toggelable>
          <div className='my-3 p-2'>
            <h2 className='display-5'>Groups</h2>
            <GroupsNav groups={groups} setGroup={setGroup} setExpenses={props.setExpenses} />
          </div>
      </div>
    </div>
  )
}
function GroupsNav({groups,setGroup,setExpenses}){
  console.log(groups)
  const [activeGroup,setActiveGroup] = useState(groups[0]? groups[0]._id.toString():'');

  const props={
    setActiveGroup,
    setGroup,
    activeGroup,
    setExpenses,
  }

  return(
    <div>
      <div className='list-group'>
        {groups && groups.map((e,i) => <EachGroupInGroupNav key={e._id + 'GroupsKey' + i} data={e} {...props} />)}
      </div>
      <Link className='btn loginBtn my-auto' to='/groupsForm'>Add Group</Link>
    </div>
  )
}
function EachGroupInGroupNav({data,setGroup,setActiveGroup,activeGroup,setExpenses}){
  const condition = data._id.toString() === activeGroup

  async function handleChangeActiveGroup(){
    if(condition){
      return
    }
    const newGroupData = await getGroupData(data._id.toString())
    console.log(newGroupData.expenses)
    setGroup(newGroupData)
    setActiveGroup(data._id)
    setExpenses([...newGroupData.expenses])
  }

  async function deleteGroup(){
    const res = await deleteGroupReq(data._id.toString())
    console.log(res)
  }

  return(
    <div className={`list-group-item ${condition? 'active':''} `}>
      <div className='d-flex justify-content-between align-items-center'>
        <div onClick={handleChangeActiveGroup} className='EachGroupNav'>{data.name}</div>
        <button className='btn btn-danger' onClick={deleteGroup}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  )
}
function EachResult({data}){
  return(
    <div className=''>
      You {data.action? 'need to take back':'need to pay'} Rs. {data.amount} {!data.action? "to":"from"} {data.to.username}
    </div>
  )
}
function CurrentMembers({group}){
  return(
    <div className='col-md-3'>
        <h3>Current members:</h3>
        <ul className='list-group'>
          {group.members.map(e => <li className='list-group-item' key={e._id}>{e.username}</li>)}
        </ul>
      </div>
  )
}
function EachExpenseItem({expense}){
  console.log(expense)
  return(
    <li className='list-group-item'>
      <div className='d-flex flex-column'>
          <div>Spent <strong>Rs.{expense.amount}</strong> at <strong>{expense.name}</strong></div>
          <div className='ms-3'>
            <div><strong>PaidBy</strong>:  {expense.paidBy.map(e => e.username).join(',  ')}</div>
            <div><strong>PaidTo</strong>:  {expense.paidTo.map(e => e.username).join(',  ')}</div>
          </div>
      </div>
    </li>
  )
}
function Expenses({expenses}){

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
        {expenses && expenses.map((e) => {
          return (
            <EachExpenseItem key={e._id} expense={e}/>
          )
        })}
      </ul>
    </div>
  )
}

export default function Dashboard({group, setGroup, expenses, setExpenses }) {
  
  const {currentUser} = useContext(AuthContext)
  const [resultValue, setResultValue] = useState([])

  async function prePostObjectConctatination(){

    // const finalDataToSend = [...expenses,currentUser._id.toString()]
    const finalDataToSend = {
      expenses,
      query: currentUser._id,
      members: group.members,
    }
    const ans=await postResult(finalDataToSend)
    setResultValue([...ans])
  }

  const props = {
    expenses,
    setExpenses,
    group,
    setGroup,
    groups: currentUser.groups,
  }
  return (
    <div className='container-fluid px-0 dashBoard-main'>
        <div className='row m-0 shadow p-2'>
          <MainForm {...props} />
          <div className='col-md-9 row'>
            <CurrentMembers group={group} />
            <Expenses expenses={expenses} />
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
