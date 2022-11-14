const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    friends: 
    {
        currentFriends:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        ],
        pendingRequests:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        ],
        sentRequests:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            }
        ]
    },
    verified: Boolean
})

const Users = mongoose.model('User',userSchema)

module.exports = Users