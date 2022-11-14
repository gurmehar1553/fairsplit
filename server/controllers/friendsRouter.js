const friendsRouter =require('express').Router()
const Users = require('../modals/userModals')


friendsRouter.post("/search", async (req,res) => {
    const query = req.body.query
    console.log(query)
    const foundUsers = await Users.find({username:query})
    console.log("foundUsers =>",foundUsers)
    res.json(foundUsers)
})

module.exports = friendsRouter