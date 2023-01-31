import axios from "axios";
import HttpProxyAgent from "http-proxy-agent/dist/agent";

const proxy = "http://localhost:3001"

const agent = new HttpProxyAgent(proxy)

const URL='/'

let token = null
const localToken = typeof window !== "undefined" && localStorage.getItem("authToken")
const setToken = (jwt) =>{
    token = `bearer ${jwt}`
    typeof window !== "undefined" && localStorage.setItem("authToken",jwt)
}

if(localToken){
    setToken(localToken)
}

async function postResult(data){
    const response = await axios.post(URL+'handlePost',data,{httpsAgent: agent})
    return response.data
}
async function postLogin(data){
    const response = await axios.post(URL+'login',data,{httpsAgent: agent})
    return response.data
}
async function verifyAuth(){
    const verification = await axios.get(URL+'login',{headers:{Authorization: token},httpsAgent: agent})
    return verification.data
}
async function postSignUp(data){
    const res = await axios.post(URL + 'signup',data,{httpsAgent: agent})
    return res.data
}
async function postFriendsSearch(data){
    const res = await axios.post(URL + 'friends/search',data,{httpsAgent: agent})
    return res.data
}
async function sendFriendRequest(data){
    const res = await axios.post(URL + 'friends/sendrequest',data,{httpsAgent: agent})
    return res.data
}
async function requestAcceptReject(data){
    const res = await axios.put(URL + 'friends',data,{httpsAgent: agent})
    return res.data
}
async function removeFriend(data){
    const res = await axios.put(URL + 'friends/removefriend',data,{httpsAgent: agent})
    return res.data
}
async function sendOTP(data){
    const res = await axios.post(URL + 'signup/sendOTP',data,{httpsAgent: agent})
    return res.data
}
async function groupsData(data){
    const res = await axios.post(URL + 'groups',data,{headers:{Authorization: token},httpsAgent: agent})
    return res.data
}
async function getGroupData(id){
    const res = await axios.get(URL + 'groups/' + id ,{httpsAgent: agent})
    return res.data
}
async function updateGroupDataExpense(id,data){
    const res = await axios.put(URL + 'groups/' + id, data,{httpsAgent: agent})
    return res.data
}
async function deleteGroupDataExpense(id,eid){
    const res = await axios.delete(URL + 'groups/' + id + '/expense/' + eid,{httpsAgent: agent})
    return res.data
}
async function deleteGroupReq(id){
    const res = await axios.delete(URL+ 'groups/'+id,{headers:{Authorization: token},httpsAgent: agent})
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
    groupsData,
    getGroupData,
    updateGroupDataExpense,
    deleteGroupDataExpense,
    deleteGroupReq,
}