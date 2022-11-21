/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const friendsRouter = require('express').Router();
const Users = require('../modals/userModals');
const { info } = require('../utils/logger');

friendsRouter.post('/search', async (req, res) => {
  const query = new RegExp(req.body.query, 'i');
  const { user } = req.body;
  const foundUsers = await Users.find({ username: query });
  const searchResults = foundUsers.filter((e) => !user.includes(e._id.toString()));
  res.json(searchResults);
});

friendsRouter.post('/sendrequest', async (req, res) => {
    const query = new RegExp(req.body.query,'i') 
    const user = req.body.user
    info(user)
    const foundUsers = await Users.find({username:query})
    info(foundUsers)
    const searchResults = foundUsers.filter((e) => {
        return !user.includes(e._id.toString())
    })
    res.json(searchResults)
})

friendsRouter.put('/', async (req, res) => {
  const query = req.body;
  const accDec = query.reply;
  const sender = await Users.findById(query.sender);
  const reciver = await Users.findById(query.reciver);
  const sendersSent = sender.friends.sentRequests;
  const reciverPending = reciver.friends.pendingRequests;

  sender.friends.sentRequests = sendersSent.filter((e) => e.toString() !== reciver._id.toString());
  reciver.friends.pendingRequests = reciverPending.filter((e) => e.toString() !== sender._id.toString());
  if (accDec === 'accept') {
    sender.friends.currentFriends.push(reciver._id);
    reciver.friends.currentFriends.push(sender._id);
    res.json({ status: true });
  }
  if (accDec === 'reject') {
    res.json({ status: false });
  }
  sender.save();
  reciver.save();
});

friendsRouter.put('/removeFriend', async (req, res) => {
  try {
    const { remover, removal } = req.body;
    const Remover = await Users.findById(remover);
    const Removal = await Users.findById(removal);
    info(Remover);
    const newFriendsRemover = Remover.friends.currentFriends.filter((e) => e._id.toString() !== removal);
    Remover.friends.currentFriends = newFriendsRemover;

    const newFriendsRemoval = Removal.friends.currentFriends.filter((e) => e._id.toString() !== remover);
    Removal.friends.currentFriends = newFriendsRemoval;
    info();
    info(Remover);
    info();
    info(Removal);
    await Remover.save();
    res.send(true);
  } catch (e) {
    info(e.message);
    res.send(false);
  }
});

module.exports = friendsRouter;
