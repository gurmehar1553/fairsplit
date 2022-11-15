const dashboardRouter = require('express').Router()
const solve = require('../logic/logic.js')
const {info}=require('../utils/logger.js')

dashboardRouter.post('/handlePost',(req,res)=>{
    info('Req on handlePost')
    const obj=req.body
    const query=obj.pop()
    
    const final_arr = solve(obj,query)
    res.json(final_arr)
})

module.exports = dashboardRouter
