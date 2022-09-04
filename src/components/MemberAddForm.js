import React from 'react'

function genertateId(){
    return (Math.random() * 100000).toFixed(0)
}

export default function MemberAddForm({setMembers, members}) {
    function handleSubmit(event){
        event.preventDefault()
        console.log(event.target.newMemberName.value)
        const newMember ={
            name:event.target.newMemberName.value,
            id:genertateId()
        }
        console.log(members)
        console.log(newMember)
        const newArr = [...members, newMember]
        setMembers(newArr)
        event.target.newMemberName.value=''
    }
    return (
        <form className='form p-4' onSubmit={handleSubmit}>
            <input className='form-control my-2' type='text' name='newMemberName' required placeholder='New member'/>
            <button className='btn btn-primary my-2' type='submit'>Add Member</button>
        </form>
    )
}
