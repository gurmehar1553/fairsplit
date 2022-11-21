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
  if (!authStatus) {
    info('Invalid Token');
    res.json({ authStatus, user: null });
    return;
  }
  info('User Found: ', user);
  res.json({ authStatus, user });
});

loginApiHandler.post('/', async (req, res) => {
  const incommingData = req.body;
  const [tempUser] = await Users.find({ email: incommingData.email });
  if (!tempUser) {
    res.send({
      status: false,
      message: 'This account does not exist...',
    });
    return;
  }
  const matchPass = await bcrypt.compare(incommingData.password, tempUser.password);
  if (matchPass) {
    const token = jwt.sign(incommingData, SecretKey, { expiresIn: incommingData.rememberMe ? '9999d' : '1h' });
    res.send(token);
    return;
  }
  res.send({
    status: false,
    message: 'This account is not verified or does not exist',
  });
});

module.exports = loginApiHandler;
