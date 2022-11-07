const dashboardRouter = require('express').Router()
const solve = require('../logic/logic.js')

dashboardRouter.post('/handlePost',(request,response)=>{
    const transaction = request.body
    console.log("transaction",transaction)
    let obj=transaction
    const query=obj.pop()
    var input= obj.map((ele)=>{
        var str=`${ele.lenders}-${ele.amt_lent}-${ele.borrowers.join(",")}`
        console.log(str)
        return str
    })
    const final_arr = solve([...input,query])
    console.log(final_arr)
    response.json(final_arr)
})

module.exports = dashboardRouter
