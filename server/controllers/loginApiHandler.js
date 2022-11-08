require('dotenv').config()

const loginApiHandler = require('express').Router()
const jwt = require('jsonwebtoken')
const Users = require('../modals/userModals')


const SecretKey = process.env.SECRET_JWT_KEY

loginApiHandler.get("/",authorization)

loginApiHandler.post('/',async (req,res) => {
    const incommingData = req.body
    console.log(incommingData)
    
    const [tempUser] = await Users.find({email:incommingData.email})
    
    if(!tempUser){
        res.send(false)
    }

    console.log("Found user =>",tempUser)

    const condition = incommingData.email === tempUser.email && incommingData.password === tempUser.password 
    incommingData.rememberMe? console.log("user is to be remembered"):console.log("user will be logged out in 1 h")
    const expiry = incommingData.rememberMe? "9999d":"1h"

    if(condition){
        const token = jwt.sign(incommingData,SecretKey,{expiresIn:expiry})
        res.send(token)
    }else{
        res.send(false)
    }
})

function authorization(req,res){
    const authHeader = req.get("Authorization")
    const token = authHeader && authHeader.split(" ")[1]
    
    if(token == null){
        console.log("token he null tha")
        res.json({
            authStatus:false,
            user:null,
        })
        return
    }

    jwt.verify(token,SecretKey, async (err, user)=>{

        const userData = await Users.findOne({email:user.email}).populate({path:'friends', populate:{path:'sentRequests', select:['username','_id']}}).populate({path:'friends', populate:{path:'pendingRequests', select:['username','_id']}}).populate({path:'friends', populate:{path:'currentFriends', select:['username','_id']}})
        console.log("UserData - >>>>>>>",userData)
        if(err){
            console.log("Error is ->>>>>>>",err.message)
            res.json({
                authStatus:false,
                user:null,
            })
        }else{
            res.json({
                authStatus:true,
                user:userData,
            })
        }
    })
}

module.exports = loginApiHandler