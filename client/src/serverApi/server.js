import axios from "axios";

const URL='/'

async function postResult(data){
    const response = await axios.post(URL+'handlePost',data)
    return response.data
}
async function postLogin(data){
    const response = await axios.post(URL+'login',data)
    return response.data
}
async function varifyAuth(){
    const varification = await axios.get(URL+'login')
    console.log(varification.data)
    return varification.data
}

export { postResult,postLogin,varifyAuth }