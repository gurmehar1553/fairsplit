import axios from "axios";

<<<<<<< HEAD
// const gurmeharsURL='http://192.168.85.174:3001/'
const gurmeharsURL='/'

async function postResult(data){
    const response = await axios.post(gurmeharsURL+'handlePost',data)
    console.log(response.body)
    console.log(response.data)
=======
const URL='/'

async function postResult(data){
    const response = await axios.post(URL+'handlePost',data)
    return response.data
}
async function postLogin(data){
    const response = await axios.post(URL+'login',data)
>>>>>>> Jastagar-Dev
    return response.data
}

export { postResult,postLogin }