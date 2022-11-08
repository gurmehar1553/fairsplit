import React from 'react'
import {useField} from '../hooks/hooks'
import { v4 as genertateId } from 'uuid'


function MemberListItem({member,inputName}){
    console.log(member.name)
    return(
        <li className='list-group-item' key={member.id + 'key'}>
            <label htmlFor={member.id + 'id' + inputName} className='my-auto' >
                <input className='mx-2' id={member.id + 'id' + inputName} value={member.name} type='checkbox' name={inputName} />
                {member.id==='00000'? 'You':member.name}
            </label>  
        </li>
    )
}

function MemberListings({members, name, inputName}){
    return(
        <div className='col-md-6'>
            {name}:
            <div className='text-start'>
                <ul className='list-group'>
                    {members.map((member) => {
                        return <MemberListItem member={member} inputName={inputName} key={member.id + 'key'} />
                    })}
                </ul>
            </div>
        </div>
    )
}

export default function Form({setExpenses, expenses, members, setlendersAndBorrowers, lendersAndBorrowers}) {
    
    const inputName = useField('text')
    const inputExpense = useField('number')

    function handleSubmit(event){

        event.preventDefault()


        const newLenders = [...event.target.involvedMembers].filter(element => element.checked? element.value:false);
        const newBorrowers = [...event.target.paidForMembers].filter(element => element.checked? element.value:false);
        const nameLenders = newLenders.map(e => e.value)
        const nameBorrowers = newBorrowers.map(e => e.value)


        const newExpense = {
            name:inputName.value,
            amt_lent:inputExpense.value,
            id:genertateId().split('-').join('')
        }
        const objectedLendersAndBorrowers = {
            lenders: nameLenders,
            borrowers: nameBorrowers
        }
        
        
        inputName.onChange('')
        inputExpense.onChange('')
        
        
        setExpenses([...expenses, newExpense])
        setlendersAndBorrowers([...lendersAndBorrowers, objectedLendersAndBorrowers])
        
    }

    return (
        <form className='p-4 form' onSubmit={handleSubmit}>
            <h1> New Expense </h1>
            <input className='form-control my-2' required placeholder='Expense Name' name='Text' {...inputName} />
            <input className='form-control my-2' required placeholder='Expense Amount' name='w' {...inputExpense} />
            <div className='row justify-content-center'>
                <MemberListings members={members} name='Paid By' inputName={'involvedMembers'} />
                <MemberListings members={members} name='Paid To' inputName={'paidForMembers'} />
            </div>
            <button className='btn loginBtn my-2' >Add Expense</button>
        </form>
    )
}
