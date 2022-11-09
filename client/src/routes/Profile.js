import React, {useContext, useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import Header from '../components/Header'
import {useField} from '../hooks/hooks'
import {postFriendsSearch, requestAcceptReject, sendFriendRequest} from '../serverApi/server'
import AuthContext from '../utils/AuthProvider'

function FriendsTab({friends}){

    console.log('friends',friends)

    return(
        <div className="col-md-6 p-3 h-100">
            <div className="card mb-4 mb-md-0 h-100">
                <div className="card-body">
                    <h1>Your friends</h1>
                </div>
                <div>
                    <ul className='list-group'>
                        {friends && friends.map((e,i) => {
                            return(
                                <li key={i + "KeyForCurrentFriends"} className='list-group-item'>{e.username}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
function AddFriendsTab(){

    const {currentUser} = useContext(AuthContext)

    const searchQuery = useField('text')
    const [searchResults,setSearchResults] = useState([])

    async function handleSearch(e){
        e.preventDefault()

        const friendsIds = currentUser.friends.currentFriends.map(e => e._id)

        const data = {query:searchQuery.value, user:friendsIds}
        const res = await postFriendsSearch(data)
        setSearchResults(res)
    }

    return(
        <div className="col-md-6 p-3 h-100">
            <div className="card mb-4 mb-md-0 h-100">
                <div className="card-body">
                    <h1>Search New Friends</h1>
                </div>
                <form onSubmit={handleSearch} className="mx-auto">
                    <div className="input-group mb-3">
                        <input className="form-control" placeholder="Username" {...searchQuery} />
                        <button className="input-group-text" id="basic-addon2">Search</button>
                    </div>
                </form>
                <div className='p-3'>
                    <h5>Users Found:</h5>
                    <ul className='list-group'>
                        {searchResults.map((e,i) => <EachSearchedFriend key={i + 'keyForsearchResults'} data={e} />)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
function FriendRequestsTab({friends}){
    if(friends.pendingRequests.length === 0){
        return (
        <div className="card mb-4 mb-md-0 h-100">
            <div className="card-body">
                <h5>New Requests</h5>
                <hr/>
                <div>
                    No pending requests...
                </div>
            </div>
        </div>)
    }
    return(
            <div className="card mb-4 mb-md-0 h-100">
                <div className="card-body">
                    <h5>New Requests</h5>
                    <hr/>
                    <div>
                        <ul className='list-group'>
                            {friends && friends.pendingRequests.map((e,i) => {
                                return(
                                    <EachFriendRequest key={i + "KeyForFriendRequestsTab"} data={e} />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
    )
}


function EachFriendRequest({data}){

    const {currentUser,setUser} = useContext(AuthContext)
    const [displayRequest,setDisplayRequest] = useState('block')
    console.log('data',data)

    async function handleAcceptRejeact(e){
        
        console.log(e.target.value)
        const sentResponse = { 
            sender:data._id,
            reciver:currentUser._id,
            reply:e.target.value
        }
        const res = await requestAcceptReject(sentResponse)
        const requests = currentUser.friends.pendingRequests
        console.log('aagye yeha')
        if(res.status){ 
            currentUser.friends.pendingRequests = requests.filter(e => {
                console.log('e',e)
                console.log('friend', sentResponse.sender)
                return e._id.toString() !== sentResponse.sender
            })
            console.log("New pending Requests",currentUser.friends.pendingRequests)
            console.log(data)
            currentUser.friends.currentFriends.push(data)
            console.log('Current Friends',currentUser.friends.currentFriends)
            console.log('current User->',currentUser)
        }
        console.log('settingUser...')
        setUser(currentUser)
        console.log(res)
        setDisplayRequest('none')
    }

    return(
        <li style={{display:displayRequest}} className='list-group-item'>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h4>{data.username}</h4>
                </div>
                <div>
                    <button className='btn btn-outline-success' value='accept' onClick={handleAcceptRejeact} >Y</button>
                    <button className='btn btn-outline-danger' value='reject' onClick={handleAcceptRejeact} >N</button>
                </div>
            </div>
        </li>
    )
}
function EachSearchedFriend({data}){

    const {currentUser} = useContext(AuthContext)

    async function handleAddFriend(){

        const ids = {
            sender:currentUser._id,
            reciver:data._id,
        }
        const res = await sendFriendRequest(ids)
        console.log(res)
    }

    return(
        <li className='list-group-item'>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h4>{data.username}</h4>
                </div>
                <div>
                    <button className='btn btn-outline-success' onClick={handleAddFriend} >Add Friend</button>
                </div>
            </div>
        </li>
    )
}



function UserDetails({user}){

    return(
        <section>
            <div className="container py-5">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4">
                    <div className="card-body text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{width:"150px"}} />
                        <h5 className="my-3">{user.username}</h5>
                        <div className="d-flex justify-content-center mb-2"></div>
                    </div>
                    </div>
                    <FriendRequestsTab friends={user.friends}/>
                </div>
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Full Name</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{user.username}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <FriendsTab friends={user.friends.currentFriends}  />
                        <AddFriendsTab/>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default function Profile() {

    const {auth,currentUser} = useContext(AuthContext)
    useEffect(()=>{},[currentUser])
    if(!auth){
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <Header />
            <UserDetails user={currentUser} />
        </div>
    )
}