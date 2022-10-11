import axios from "axios";

async function postResult(data){
    const response = await axios.post('http://localhost:3001/handlePost',data)
    return response.data
}

export { postResult }