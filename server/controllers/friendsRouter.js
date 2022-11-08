require("dotenv").config()

const friendsRouter =require('express').Router()
const Users = require('../modals/userModals')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_JWT_KEY


friendsRouter.post("/search", async (req,res) => {
    const query = req.body.query
    const user = req.body.user
    console.log(query)
    console.log(user)
    const foundUsers = await Users.find({username:query})

    const searchResults = foundUsers.filter((e) => {

        console.log('inside found',e._id.toString())

        return !user.includes(e._id.toString())
    })

    console.log('searched results ',searchResults)

    console.log("foundUsers =>",foundUsers)
    res.json(searchResults)
})

friendsRouter.post('/sendrequest', async (req,res) =>{

    const data = req.body
    const sender = await Users.findById(data.sender)
    const reciver = await Users.findById(data.reciver)

    const condition = reciver.friends.pendingRequests.includes(data.sender)
    
    const populatedSender = await sender.populate({path:'friends', populate:{path:'sentRequests'}});
    const populatedReciver = await reciver.populate({path:'friends', populate:{path:'pendingRequests'}});

    if(condition){
        res.send('Requested Already')
        return
    }

    sender.friends.sentRequests.push(data.reciver)
    reciver.friends.pendingRequests.push(data.sender)

    sender.save()
    reciver.save()

    console.log(populatedSender)
    console.log(populatedReciver)
    res.send("Friend Request Sent")
})

friendsRouter.put("/", async (req,res) => {
    const query = req.body
    console.log(query)
    const sender = await Users.findById(query.sender)
    const reciver = await Users.findById(query.reciver)
    const accDec = query.reply

    const sendersSent = sender.friends.sentRequests
    const reciverPending = reciver.friends.pendingRequests

    console.log("Sent requests ->>>",sendersSent)
    console.log("Pending Requests ->>>",reciverPending)


    console.log("sender =>",sender)
    console.log("reciver =>",reciver)

    if(accDec === 'accept'){
        console.log("Accepting...")
        sender.friends.currentFriends.push(reciver._id)
        sender.friends.sentRequests = sendersSent.filter((e)=>{
            console.log('returning', e === reciver._id)
            console.log('returning e      ', e.toString())
            console.log('returning reciver', reciver._id.toString())
            return e.toString() !== reciver._id.toString()
        })
        console.log('old',sendersSent)
        console.log('new',sender.friends.sentRequests)

        reciver.friends.currentFriends.push(sender._id)
        reciver.friends.pendingRequests = reciverPending.filter((e)=>{
            return e.toString() === sender._id.toString()
        })
        res.send('Request Accepted')
        
    }
    if(accDec === 'reject'){
        console.log('Rejecting....')
        sender.friends.sentRequests = sendersSent.filter((e)=>{return e.toString() !== reciver._id.toString() })
        reciver.friends.pendingRequests = reciverPending.filter((e)=>{ return e.toString() !== sender._id.toString() })
        res.send('Request Rejected')
    }

    sender.save()
    reciver.save()

    console.log("sender =>",sender)
    console.log("reciver =>",reciver)
    console.log("accDec =>",accDec)
})

module.exports = friendsRouter