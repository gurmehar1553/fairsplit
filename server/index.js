const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const solve=require('./logic/logic.js')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(express.static('build'))
app.use(cookieParser())
app.use(cors())



const tempUser = {
    email:'jastagarbrar@gmail.com',
    password:'jastagarbrar'
}


const SecretKey = "fairSplit"


app.get('/', (req, res) => {
    console.log(req.cookies)
    res.sendFile('index.html')
}) 

app.get('/getResults', (req,res) => {
    console.log('I recieved a request')
    res.json(obj)
})

app.get("/login", async (req,res) =>{
    const authToken = req.cookies
    console.log(authToken)
    var verified;
    try{
        jwt.verify(authToken.auth,SecretKey)
        verified=true
    }catch(e){
        verified=false
    }
    res.send(verified)
})

app.post('/login',async (req,res) => {
    const incommingData = req.body
    console.log(incommingData)

    const condition = incommingData.email === tempUser.email && incommingData.password === tempUser.password 

    if(condition){
        const token = jwt.sign(incommingData,SecretKey)
        console.log("userVerified and TokenCreated: ",token)
        res.cookie("auth",token)
        res.send(true)
    }else{
        res.send(false)
    }
})

app.post('/handlePost',(request,response)=>{
    const transaction = request.body
    console.log("transaction",transaction)
    let obj=transaction
    const query=obj.pop()
    var input= obj.map((ele)=>{
        var str=`${ele.lenders}-${ele.amt_lent}-${ele.borrowers.join(",")}`
        console.log(str)
        return str
    })
    const final_arr=solve([...input,query])
    console.log(final_arr)
    response.json(final_arr)
})

app.listen(3001,()=>{
    console.log("Starting the server at port 3001")
})  