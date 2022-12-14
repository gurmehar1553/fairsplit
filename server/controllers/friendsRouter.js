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
  if (searchResults.length) {
    res.json({
      status: true,
      message: 'Found User(s)',
      result: searchResults,
    });
    return;
  }
  res.json({
    status: false,
    message: 'No users Found',
    result: null,
  });
});

friendsRouter.post('/sendrequest', async (req, res) => {
  const data = req.body;
  const reciver = await Users.findById(data.reciver);
  const condition = reciver.friends.pendingRequests.includes(data.sender);
  if (condition) {
    res.send({
      status: false,
      message: 'Requested Already',
    });
    return;
  }
  const sender = await Users.findById(data.sender);
  sender.friends.sentRequests.push(data.reciver);
  reciver.friends.pendingRequests.push(data.sender);
  await sender.save();
  await reciver.save();
  res.send({
    status: true,
    message: 'Friend Request Sent',
  });
});

friendsRouter.put('/', async (req, res) => {
  const query = req.body;
  info('');
  info('query ->', query);
  const accDec = query.reply;
  info('reply', accDec);
  const sender = await Users.findById(query.sender);
  info('Sender', sender);
  const reciver = await Users.findById(query.reciver);
  info('Reciver', reciver);
  const sendersSent = sender.friends.sentRequests;
  info('Senders Sent requests', sendersSent);
  const reciverPending = reciver.friends.pendingRequests;
  info('Recivers Pending requests', reciverPending);

  sender.friends.sentRequests = sendersSent.filter((e) => e.toString() !== reciver._id.toString());
  reciver.friends.pendingRequests = reciverPending.filter((e) => e.toString() !== sender._id.toString());
  if (accDec) {
    sender.friends.currentFriends.push(reciver._id);
    info('Senders Friends after Accepting:', sender.friends.currentFriends);
    reciver.friends.currentFriends.push(sender._id);
    info('Recivers Friends after Accepting:', reciver.friends.currentFriends);
    await sender.save();
    await reciver.save();
    res.json({
      status: true,
      message: 'Request Accepted',
    });
  }
  if (!accDec) {
    await sender.save();
    await reciver.save();
    res.json({
      status: false,
      message: 'Request Declined',
    });
  }
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
    res.send({
      status: true,
      message: 'Friend Removed Successfully',
    });
  } catch (e) {
    info(e.message);
    res.send({
      status: false,
      message: `Unable to remove friend due to : ${e.message}`,
    });
  }
});

module.exports = friendsRouter;
