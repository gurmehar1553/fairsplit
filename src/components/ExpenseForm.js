import React, {useState} from 'react'
// import Toggelable from './Toggelable'

function genertateId(){
    return (Math.random() * 100000).toFixed(0)
}

export default function Form({setExpenses, expenses, members, setLenders, setBorrowers}) {
    
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

        console.log(event.target.involvedMembers)
        console.log(event.target.paidForMembers)
        const newLenders = [...event.target.involvedMembers].filter(element => {
            return element.checked? element.value:false
        });
        const newBorrowers = [...event.target.paidForMembers].filter(element => {
            return element.checked? element.value:false
        });

        const nameLenders = newLenders.map((e)=> {return e.value})
        const nameBorrowers = newBorrowers.map((e)=> {return e.value})
        console.log('lenders:',nameLenders)
        console.log('borrowers:',nameBorrowers)
        const newExpense = {
            name,
            amount:expenseAmount,
            id:genertateId()
        }
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses)
        setName('')
        setExpenseAmount('')
        setLenders(nameLenders)
        setBorrowers(nameBorrowers)
    }
    return (
        <form className='p-4 form' onSubmit={handleSubmit}>
            <h1> New Expense </h1>
            <input className='form-control my-2' name='Text' type='text' value={name} onChange={handleNameChange} required placeholder='ExpenseName'/>
            <input className='form-control my-2' name='w' type='number' value={expenseAmount} onChange={handleAmountChange} required placeholder='Expense in Rs'/>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    Paid By:
                    <ul className='text-start'>
                        {members.length >3? <li>All</li>:''}
                        {members.map((member) => {
                            return <li key={member.id + 'key'}>
                            <label htmlFor={member.id + 'idPF'}>{member.name}</label>
                            <input id={member.id + 'idPF'} value={member.name} type='checkbox' name='involvedMembers'></input>
                            </li>
                        })}
                    </ul>
                </div>
                <div className='col-md-6'>
                    Paid to:
                        <div className='text-start'>
                            <ul>
                                {members.length >3? <li>All</li>:''}
                                {members.map((member) => {
                                    if(member.id === '0000') return ''
                                    return (<li key={member.id + 'key'}>
                                                <label htmlFor={member.id + 'id'}>{member.name==='You'? 'Yourself':member.name} <input id={member.id + 'id'} value={member.name} type='checkbox' name='paidForMembers' /></label>  
                                            </li>)
                                    })
                                }
                            </ul>
                        </div>
                </div>
            </div>
            <button className='btn btn-primary my-2' >Add Expense</button>
        </form>
    )
}
