require('dotenv').config()

const loginApiHandler = require('express').Router()
const jwt = require('jsonwebtoken')
const Users = require('../modals/userModals')
const {info}=require('../utils/logger')
const SecretKey = process.env.SECRET_JWT_KEY

loginApiHandler.get("/",authorization)

loginApiHandler.post('/',async (req,res) => {
    
    const incommingData = req.body
    const [tempUser] = await Users.find({email:incommingData.email})
    
    if(!tempUser){
        res.send(false)
        return
    }
    if(incommingData.password === tempUser.password){
        const token = jwt.sign(incommingData,SecretKey,{expiresIn: incommingData.rememberMe? "9999d":"1h"})
        res.send(token)
        return
    }
    res.send(false)
})

function authorization(req,res){
    const authHeader = req.get("Authorization")
    const token = authHeader && authHeader.split(" ")[1]
    
    if(token == null){
        info(false)
        res.json({authStatus:false,user:null,})
        return
    }

    jwt.verify(token,SecretKey, async (err, user)=>{

        const userData = await Users
        .findOne({email:user.email})
        .populate({
            path:'friends', 
            populate:[
                {path:'sentRequests', select:['username','_id']},
                {path:'pendingRequests', select:['username','_id']},
                {path:'currentFriends', select:['username','_id']}
            ]
        })

        if(err){
            console.log("Error is ->>>>>>>",err.message)
            info(true)
            res.json({authStatus:false,user:null,})
            return
        }
        res.json({authStatus:true,user:userData,})
    })
}

module.exports = loginApiHandler