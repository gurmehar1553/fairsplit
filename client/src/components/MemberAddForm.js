import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useField} from '../hooks/hooks'
import {addNewgroup} from '../serverApi/server'
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
    const {currentUser,setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    
    async function handleSubmit(event){
        // console.log(currentUser)
        event.preventDefault()
        const inputMembers = [...event.target.selected_Members]
        const selectedMembers = inputMembers.filter(e => e.checked) //filter Checked Members from all members
        const idsOfSelectedMembers = selectedMembers.map(e => e.id) //maps the ids of checkedMembers
        
        const groupData = {
            name: nameField.value,
            leader: currentUser._id,
            description: descriptionField.value,
            members: [...idsOfSelectedMembers,currentUser._id],
            expenses:[],
        }
        // console.log('mapped selected Mebers', groupData)
        const res = await addNewgroup(groupData)
        if(res.status){
            // console.log(res.createdGroup)
            const newGroups = currentUser.groups.concat(res.createdGroup)
            setUser({...currentUser,groups: newGroups})
            navigate('/app', { replace:true })
        }

    }

    return (
        <form className='form p-4' onSubmit={handleSubmit}>
            <h1>New Members</h1>
            <div className="my-5">
                <input placeholder='Group Name' className='form-control' required {...nameField} />
            </div>
            <div className="my-5">
                <textarea placeholder='Description' className='form-control' {...descriptionField} />
            </div>
            <MembersFormInput user={currentUser} />
            <button className='btn loginBtn my-2' type='submit'>Create Group</button>
        </form>
    )
}
