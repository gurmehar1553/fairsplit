import React, {useContext, useState} from 'react'
import {Navigate} from 'react-router-dom'
import Header from '../components/Header'
import {useField} from '../hooks/hooks'
import {postFriendsSearch} from '../serverApi/server'
import AuthContext from '../utils/AuthProvider'

function FriendsTab({friends}){
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
                                <li className='list-group-item'>{e.username}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function EachSearchedFriend({data}){
    return(
        <li className='list-group-item'>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h4>{data.username}</h4>
                </div>
                <div>
                    <button className='btn btn-outline-success' >Add Friend</button>
                </div>
            </div>
        </li>
    )
}

function AddFriendsTab(){

    const searchQuery = useField('text')
    const [searchResults,setSearchResults] = useState([])

    async function handleSearch(e){
        e.preventDefault()
        const data = {query:searchQuery.value}
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

function UserDetails({user}){
    return(
        <section style={{backgroundColor: '#eee'}}>
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
                        <FriendsTab friends={user.friends.currentFriends} />
                        <AddFriendsTab />
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default function Profile() {

    const {auth,currentUser} = useContext(AuthContext)

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
