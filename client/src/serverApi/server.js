import axios from "axios";

// const gurmeharsURL='http://192.168.85.174:3001/'
const gurmeharsURL='/'

async function postResult(data){
    const response = await axios.post(gurmeharsURL+'handlePost',data)
    console.log(response.body)
    console.log(response.data)
    return response.data
}

export { postResult }