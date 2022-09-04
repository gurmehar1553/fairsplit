import React, {useState} from 'react'

function genertateId(){
    return (Math.random() * 100000).toFixed(0)
}

export default function Form({setExpenses, expenses}) {
    
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
            
            <button className='btn btn-primary my-2' >Add Expense</button>
        </form>
    )
}
