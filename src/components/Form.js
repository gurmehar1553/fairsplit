import React, {useState} from 'react'

export default function Form() {
    
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
        console.log('Function Called:', name, expenseAmount)
        setName('')
        setExpenseAmount('')
    }
    return (
        <div>
            <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                <h1> New Expense </h1>
                <input name='Text' className='my-2' type='text' value={name} onChange={handleNameChange} required/>
                <input name='w' className='my-2' type='number' value={expenseAmount} onChange={handleAmountChange} required/>
                <button className='btn btn-primary my-2' >Add Expense</button>
            </form>
        </div>
    )
}
