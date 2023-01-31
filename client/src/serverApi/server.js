import axios from "axios";

const URL='/'

let token = null
const localToken = window.localStorage.getItem("authToken")
const setToken = (jwt) =>{
    token = `bearer ${jwt}`
    window.localStorage.setItem("authToken",jwt)
}

if(localToken){
    setToken(localToken)
}

async function postResult(data){
    const response = await axios.post(URL+'handlePost',data)
    return response.data
}
async function postLogin(data){
    const response = await axios.post(URL+'login',data)
    return response.data
}
async function verifyAuth(){
    const verification = await axios.get(URL+'login',{headers:{Authorization: token}})
    return verification.data
}
async function postSignUp(data){
    const res = await axios.post(URL + 'signup',data)
    return res.data
}
async function postFriendsSearch(data){
    const res = await axios.post(URL + 'friends/search',data)
    return res.data
}
async function sendFriendRequest(data){
    const res = await axios.post(URL + 'friends/sendrequest',data)
    return res.data
}
async function requestAcceptReject(data){
    const res = await axios.put(URL + 'friends',data)
    return res.data
}
async function removeFriend(data){
    const res = await axios.put(URL + 'friends/removefriend',data)
    return res.data
}
async function sendOTP(data){
    const res = await axios.post(URL + 'signup/sendOTP',data)
    return res.data
}
async function addNewgroup(data){
    const res = await axios.post(URL + 'groups',data,{headers:{Authorization: token}})
    return res.data
}
async function getGroupData(id){
    const res = await axios.get(URL + 'groups/' + id )
    return res.data
}
async function updateGroupDataExpense(id,data){
    const res = await axios.put(URL + 'groups/' + id, data)
    return res.data
}
async function deleteGroupDataExpense(id,eid){
    const res = await axios.delete(URL + 'groups/' + id + '/expense/' + eid)
    return res.data
}
async function deleteGroupReq(id){
    const res = await axios.delete(URL+ 'groups/'+id,{headers:{Authorization: token}})
    return res.data
}

export { 
    postResult,
    postLogin,
    verifyAuth,
    setToken,
    postSignUp,
    postFriendsSearch,
    sendFriendRequest,
    requestAcceptReject,
    removeFriend,
    sendOTP,
    addNewgroup,
    getGroupData,
    updateGroupDataExpense,
    deleteGroupDataExpense,
    deleteGroupReq,
}