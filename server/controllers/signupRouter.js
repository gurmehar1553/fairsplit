require('dotenv').config()

const signupRouter = require('express').Router()
const Users = require('../modals/userModals')

signupRouter.post('/',async (req,res)=>{
    const newUser = new Users({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    })
    await newUser.save()
    res.send(true)

})

module.exports = signupRouter