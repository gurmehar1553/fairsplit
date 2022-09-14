import React, {useState} from 'react'
// import Toggelable from './Toggelable'

function genertateId(){
    return (Math.random() * 100000).toFixed(0)
}

export default function Form({setExpenses, expenses, members}) {
    
    const [ name,setName ] = useState('')
    const [ expenseAmount, setExpenseAmount ] = useState('')

   function handleNameChange(event){
        setName(event.target.value)
    }
    function handleAmountChange(event){
        setExpenseAmount(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()
        const newExpense = {
            name,
            amount:expenseAmount,
            id:genertateId()
        }
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses)
        setName('')
        setExpenseAmount('')

    }
    return (
        <form className='p-4 form' onSubmit={handleSubmit}>
            <h1> New Expense </h1>
            <input className='form-control my-2' name='Text' type='text' value={name} onChange={handleNameChange} required placeholder='ExpenseName'/>
            <input className='form-control my-2' name='w' type='number' value={expenseAmount} onChange={handleAmountChange} required placeholder='Expense in Rs'/>
            Paid by:
            <div className='row justify-content-center'>
            <div className='col-md-6'>
                Paid By:
                <ul className='text-start'>
                    {members.length >3? <li>All</li>:''}
                    {members.map((member) => {
                        return <li key={member.id + 'key'}>
                        <label htmlFor={member.id + 'id'}>{member.name}</label>
                        <input id={member.id + 'id'} type='checkbox' name='involvedMembers'></input>
                        </li>
                    })}
                </ul>
            </div>
            <div className='col-md-6'>
                Paid to:
                <div className='text-start col-5'>
                    {members.length >3? <li>All</li>:''}
                    {members.map((member) => {
                        return <div key={member.id + 'key'}>
                        <div>
                            <label htmlFor={member.id + 'id'}>{member.name==='You'? 'Including You':member.name}</label>
                            <input id={member.id + 'id'} type='checkbox' name='involvedMembers'></input>
                        </div>
                        </div>
                    })}
                </div>
                </div>
            </div>
            <button className='btn btn-primary my-2' >Add Expense</button>
        </form>
    )
}
