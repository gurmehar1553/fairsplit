require('dotenv').config()
const jwt = require('jsonwebtoken')
const Users = require('../modals/userModals')
const {info}=require('../utils/logger')
const SecretKey = process.env.SECRET_JWT_KEY

function authorization(req,res){
    const authHeader = req.get("Authorization")
    const token = authHeader && authHeader.split(" ")[1]
    
    if(token == null){
        info(false)
        res.json({authStatus:false,user:null,})
        return
    }

    jwt.verify(token,SecretKey, async (err, user)=>{
        if(err){
            info("Error is ->>>>>>>",err.message)
            info(true)
            res.json({authStatus:false,user:null,})
            return
        }

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
        res.json({authStatus:true,user:userData,})
    })
}

module.exports={authorization}