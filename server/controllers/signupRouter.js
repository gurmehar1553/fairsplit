require('dotenv').config()

const signupRouter = require('express').Router()
const Users = require('../modals/userModals')
const {info}=require('../utils/logger')

signupRouter.post('/',async (req,res)=>{

    const {username,email,password} = req.body

    const newUser = new Users({
        username,
        email,
        password,
    })

    const existingUser = await Users.find({$or:[
        {username},
        {email}
    ]})

    info(existingUser)

    if(existingUser.length >=1){
        res.send(false)
        return
    }

    await newUser.save()
    res.send(true)

})

module.exports = signupRouter