import React from 'react'
import {useField} from '../hooks/hooks'
import { v4 as genertateId } from 'uuid'
import {updateGroupDataExpense} from '../serverApi/server'


function MemberListItemPaidTo({member,inputName}){
    return(
        <li className='list-group-item' key={member._id + 'key'}>
            <label htmlFor={member._id + 'id' + inputName} className='my-auto' >
                <input className='mx-2' id={member._id + 'id' + inputName} value={member._id.toString()} type='checkbox' name={inputName} />
                {member.username}
            </label>  
        </li>
    )
}
function MemberListingsPaidTo({members, name, inputName}){
    return(
        <div className='col-md-6'>
            {name}:
            <div className='text-start'>
                <ul className='list-group'>
                    {members.map((member) => {
                        return <MemberListItemPaidTo member={member} inputName={inputName} key={member._id + 'key'} />
                    })}
                </ul>
            </div>
        </div>
    )
}

function MemberListItemPaidBy({member,inputName}){
    return(
        <li className='list-group-item' key={member._id + 'key'}>
            <label htmlFor={member._id + 'id' + inputName} className='my-auto' >
                <input className='mx-2' id={member._id + 'id' + inputName} value={member._id.toString()} type='radio' name='payer' />
                {member.username}
            </label>  
        </li>
    )
}
function MemberListingsPaidBy({members, name, inputName}){
    return(
        <div className='col-md-6'>
            {name}:
            <div className='text-start'>
                <ul className='list-group'>
                    {members.map((member) => {
                        return <MemberListItemPaidBy member={member} inputName={inputName} key={member._id + 'key'} />
                    })}
                </ul>
            </div>
        </div>
    )
}

export default function Form({setExpenses, setGroup, group}) {
    
    const inputName = useField('text')
    const inputExpense = useField('number')

    async function handleSubmit(event){

        event.preventDefault()
        const nameLenders = event.target.payer.value
        const newBorrowers = [...event.target.paidForMembers].filter(element => element.checked? element.value:false);
        const nameBorrowers = newBorrowers.map(e => e.value)

        const newExpense = {
            name:inputName.value,
            amount:inputExpense.value,
            id:genertateId().split('-').join('')
        }
        
        inputName.onChange('')
        inputExpense.onChange('')
        
        const formedData = {
            ...newExpense,
            paidBy:nameLenders,
            paidTo:nameBorrowers,
        }
        const res = await updateGroupDataExpense(group._id.toString(),formedData)
        setGroup(res.group)
        setExpenses(res.group.expenses)
    }

    return (
        <form className='p-4 form' onSubmit={handleSubmit}>
            <h1> New Expense </h1>
            <input className='form-control my-2' required placeholder='Expense Name' name='Text' {...inputName} />
            <input className='form-control my-2' required placeholder='Expense Amount' name='w' {...inputExpense} />
            <div className='row justify-content-center'>
                <MemberListingsPaidBy members={group.members} name='Paid By' inputName={'involvedMembers'} />
                <MemberListingsPaidTo members={group.members} name='Paid To' inputName={'paidForMembers'} />
            </div>
            <button className='btn loginBtn my-2' >Add Expense</button>
        </form>
    )
}
