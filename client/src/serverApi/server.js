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

export { postResult,postLogin }