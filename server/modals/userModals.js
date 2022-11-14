const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    friends: 
    {
        currentFriends:[
            {
                userId:mongoose.Schema.Types.ObjectId,
            }
        ],
        pendingRequests:[
            {
                userId:mongoose.Schema.Types.ObjectId,
            }
        ],
        sentRequests:[
            {
                userId:mongoose.Schema.Types.ObjectId,
            }
        ]
    },
    verified: Boolean
})



const Users = mongoose.model('User',userSchema)

module.exports = Users