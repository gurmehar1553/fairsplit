const Users = require('../modals/userModals')
const loginApiHandler = require('express').Router()
const {info}=require('../utils/logger')
const {authorization}=require('../utils/middleware')
const jwt = require('jsonwebtoken')
const SecretKey = process.env.SECRET_JWT_KEY


loginApiHandler.get("/",authorization)

loginApiHandler.post('/',async (req,res) => {
    
    const incommingData = req.body
    const [tempUser] = await Users.find({email:incommingData.email})
    
    if(!tempUser){
        res.send({
            status:false, 
            message:'This account does not exist...'
        })
        return
    }
    if(!tempUser.verified){
        res.json({
            status:false, 
            message:'This account is not verified'
        })
        return
    }
    if(incommingData.password === tempUser.password){
        const token = jwt.sign(incommingData,SecretKey,{expiresIn: incommingData.rememberMe? "9999d":"1h"})
        res.json({
            status:true, 
            message:'LoggedIn',
            token
        })
        return
    }
    res.send({
        status:false, 
        message:'This account is not verified or does not exist'
    })
})

module.exports = loginApiHandler