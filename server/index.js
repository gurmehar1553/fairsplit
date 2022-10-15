const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const solve=require('./logic/logic.js')

app.use(express.json())
app.use(cors())

app.use(express.static('build'))


app.get('/getResults', (req,res) => {
    console.log('I recieved a request')
    res.json(obj)
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