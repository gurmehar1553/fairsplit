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
async function varifyAuth(){
    const varification = await axios.get(URL+'loginverify',{headers:{Authorization: token}})
    console.log("incomming data =>",varification.data)
    return varification.data
}

export { postResult,postLogin,varifyAuth,setToken }