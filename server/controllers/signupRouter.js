const signupRouter = require('express').Router()
const Users = require('../modals/userModals')
const bcrypt = require('bcrypt')

signupRouter.post('/',async (req,res)=>{

    const {username,email,password} = req.body
    const saltRounds=10
    const passwordHash = await bcrypt.hash(password,saltRounds)
    const userResults = await Users.find({$or:[{username},{email}]})
    if(userResults.length){
        res.json({
            status : "Failed",
            message : "User with the provided email or username already exists"
        })
    }
    else{
        const newUser = new Users({
            username,
            email,
            password:passwordHash,
            verified:false
        })
        newUser.save()
        res.send({
            status: "Passed",
            message: "User account created"
        })
    }
})

module.exports = signupRouter