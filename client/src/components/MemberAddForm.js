import React, {useContext} from 'react'
import { v4 as genertateId } from 'uuid'
import AuthContext from '../utils/AuthProvider'


function MembersFormInputOptions({data}){
    return(
        <option value={data.username}>{data.username}</option>
    )
}

function MembersFormInput(){
    const {currentUser} = useContext(AuthContext)
    const friends = currentUser? currentUser.friends.currentFriends:[{name:'NotAuthorized',id:'1'}]
    console.log(friends)
    return(
        <select name='inputMembersFromFriends' className='form-control w-100'>
            {friends.map((e,i) => <MembersFormInputOptions key={e._id + i} data={e} />)}
        </select>
    )
}


export default function MemberAddForm({setMembers, members}) {

    function handleSubmit(event){
        event.preventDefault()
        const inputMembers = event.target.inputMembersFromFriends.value
        const newMember ={
            name:inputMembers,
            id:genertateId().split('-').join('')
        }
        const newArr = [...members, newMember]
        setMembers(newArr)
    }

    return (
        <form className='form p-4' onSubmit={handleSubmit}>
            <h1>New Members</h1>
            <MembersFormInput members={members} />
            <button className='btn loginBtn my-2' type='submit'>Add Member</button>
        </form>
    )
}
