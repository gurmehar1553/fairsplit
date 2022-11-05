const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const solve=require('./logic/logic.js')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const path = require('path')

app.use(express.json())
app.use(express.static("build"))
app.use(cookieParser())
app.use(cors())



const tempUser = {
    email:'jastagarbrar@gmail.com',
    password:'jastagarbrar'
}

const SecretKey = "fairSplit"

app.get('/getResults', (req,res) => {
    console.log('I recieved a request')
    res.json(obj)
})

app.post("/loginverify",authorization)

app.post('/login',async (req,res) => {
    const incommingData = req.body
    console.log(incommingData)

    const condition = incommingData.email === tempUser.email && incommingData.password === tempUser.password 

    if(condition){
        const token = jwt.sign(incommingData,SecretKey)
        res.send(token)
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

function authorization(req,res,next){
    const authHeader = req.get("Authorization")
    console.log("authHeader=> ",authHeader)
    const token = authHeader && authHeader.split(" ")[1]
    
    if(token == null){
        console.log("token he null tha")
        res.send(false)
        return
    }

    jwt.verify(token,SecretKey, (err, user)=>{
        if(err){
            console.log("Error is ->>>>>>>",err.message)
            res.send(false)
        }else{
            res.send(true)
        }
    })
}

app.get("*",(req,res) =>{
    res.sendFile(path.join(__dirname,"/build/index.html"))
})

app.listen(3001,()=>{
    console.log("Starting the server at port 3001")
})  