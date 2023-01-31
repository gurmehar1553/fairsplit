const loginApiHandler = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { info } = require('../utils/logger');
const { authorization } = require('../utils/middleware');
const Users = require('../modals/userModals');

const SecretKey = process.env.SECRET_JWT_KEY;

loginApiHandler.get('/', authorization, async (req, res) => {
  const { authData } = req;
  const { user, authStatus } = authData;
  info('User Found: ', user);
  res.json({ authStatus, user });
});

loginApiHandler.post('/', async (req, res) => {
  const incommingData = req.body;
  const tempUser = await Users.findOne({ email: incommingData.email }).populate({
    path: 'friends',
    populate: [
      { path: 'sentRequests', select: ['username', '_id'] },
      { path: 'pendingRequests', select: ['username', '_id'] },
      { path: 'currentFriends', select: ['username', '_id'] },
    ],
  }).populate('groups', { name: 1 });
  if (!tempUser) {
    res.send({
      status: false,
      message: 'This account does not exist...',
      token: null,
      user: null,
    });
    return;
  }
  const matchPass = await bcrypt.compare(incommingData.password, tempUser.password);
  if (matchPass) {
    const token = jwt.sign(incommingData, SecretKey, { expiresIn: incommingData.rememberMe ? '9999d' : '1h' });
    res.send({
      status: true,
      message: 'Logging in',
      token,
      user: tempUser,
    });
    return;
  }
  res.send({
    status: false,
    message: 'Wrong Password',
  });
});

module.exports = loginApiHandler;
