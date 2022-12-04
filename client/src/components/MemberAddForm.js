import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useField} from '../hooks/hooks'
import {groupsData} from '../serverApi/server'
import AuthContext from '../utils/AuthProvider'


function MembersFormInputOptions({data}){

    const inputSelectMembers = useField('checkbox')

    return(
        <label>
            <input id={data._id} name='selected_Members' {...inputSelectMembers} />
            {data.username}
        </label>
    )
}

function MembersFormInput({user}){
    const friends = user? user.friends.currentFriends:[{name:'...loading',id:'1'}]
    if(!friends.length){
        return(<div>No friends to add...</div>)
    }
    return(
        <ul className='list-group'>
            {friends.map((e,i) => <MembersFormInputOptions key={e._id + i} data={e} />)}
        </ul>
    )
}


export default function MemberAddForm() {

    const nameField = useField('text')
    const descriptionField = useField('text')
    const {currentUser} = useContext(AuthContext)

    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()
        const inputMembers = [...event.target.selected_Members]

        // inputMembers.forEach(e => console.log(e.checked))

        const selectedMembers = inputMembers.filter(e => e.checked)
        const idsOfSelectedMembers = selectedMembers.map(e => e.id)
        const currentfriendsIdOnly = currentUser.friends.currentFriends.map(e => e._id)
        const mappedSelectedMembers = currentfriendsIdOnly.filter((e) => idsOfSelectedMembers.includes(e.toString()))
        
        const groupData = {
            name: nameField.value,
            leader: currentUser._id,
            description: descriptionField.value,
            members: [...mappedSelectedMembers,currentUser._id],
        }
        // console.log('mapped selected Mebers', groupData)
        const res = await groupsData(groupData)
        res.status && navigate('/app')

    }

    return (
        <form className='form p-4' onSubmit={handleSubmit}>
            <h1>New Members</h1>
            <div className="my-5">
                <input placeholder='Group Name' className='form-control' required {...nameField} />
            </div>
            <div className="my-5">
                <textarea placeholder='Description' className='form-control' required {...descriptionField} />
            </div>
            <MembersFormInput user={currentUser} />
            <button className='btn loginBtn my-2' type='submit'>Create Group</button>
        </form>
    )
}
