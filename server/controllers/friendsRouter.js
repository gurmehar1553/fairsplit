require("dotenv").config()
const friendsRouter =require('express').Router()
const Users = require('../modals/userModals')

friendsRouter.post("/search", async (req,res) => {

    const query = req.body.query
    const user = req.body.user
    const foundUsers = await Users.find({username:query})
    const searchResults = foundUsers.filter((e) => {
        return !user.includes(e._id.toString())
    })
    res.json(searchResults)
})

friendsRouter.post('/sendrequest', async (req,res) =>{

    const data = req.body
    const sender = await Users.findById(data.sender)
    const reciver = await Users.findById(data.reciver)
    const condition = reciver.friends.pendingRequests.includes(data.sender)
    if(condition){
        res.send('Requested Already')
        return
    }
    sender.friends.sentRequests.push(data.reciver)
    reciver.friends.pendingRequests.push(data.sender)
    sender.save()
    reciver.save()
    res.send("Friend Request Sent")
})

friendsRouter.put("/", async (req,res) => {

    const query = req.body
    const sender = await Users.findById(query.sender)
    const reciver = await Users.findById(query.reciver)
    const accDec = query.reply
    const sendersSent = sender.friends.sentRequests
    const reciverPending = reciver.friends.pendingRequests

    if(accDec === 'accept'){
        sender.friends.currentFriends.push(reciver._id)
        sender.friends.sentRequests = sendersSent.filter((e)=>{
            return e.toString() !== reciver._id.toString()
        })
        reciver.friends.currentFriends.push(sender._id)
        reciver.friends.pendingRequests = reciverPending.filter((e)=>{
            return e.toString() === sender._id.toString()
        })
        res.send('Request Accepted') 
    }
    if(accDec === 'reject'){
        sender.friends.sentRequests = sendersSent.filter((e)=>{return e.toString() !== reciver._id.toString() })
        reciver.friends.pendingRequests = reciverPending.filter((e)=>{ return e.toString() !== sender._id.toString() })
        res.send('Request Rejected')
    }
    sender.save()
    reciver.save()
})

module.exports = friendsRouter