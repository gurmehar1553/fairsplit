import axios from "axios";

const gurmeharsURL='http://192.168.85.174:3001/'

async function postResult(data){
    const response = await axios.post(gurmeharsURL+'handlePost',data)
    return response.data
}

export { postResult }