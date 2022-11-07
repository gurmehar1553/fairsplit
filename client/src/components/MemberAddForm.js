import React from 'react'
import {useField} from '../hooks/hooks'
import { v4 as genertateId } from 'uuid'

export default function MemberAddForm({setMembers, members}) {

    const inputMembers = useField('text')

    function handleSubmit(event){
        event.preventDefault()
        const newMember ={
            name:inputMembers.value,
            id:genertateId().split('-').join('')
        }
        const newArr = [...members, newMember]
        inputMembers.onChange('')
        setMembers(newArr)
    }

    return (
        <form className='form p-4' onSubmit={handleSubmit}>
            <h1>New Members</h1>
            <input className='form-control my-2' name='newMemberName' required placeholder='New member' {...inputMembers} />
            <button className='btn btn-primary my-2' type='submit'>Add Member</button>
        </form>
    )
}
