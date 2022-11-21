require('dotenv').config();
const jwt = require('jsonwebtoken');
const Users = require('../modals/userModals');
const { info } = require('./logger');

const SecretKey = process.env.SECRET_JWT_KEY;

function authorization(req, res, next) {
  const authHeader = req.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  info('Incomming Token ->>', token);
  if (token == null) {
    info(false);
    res.json({ authStatus: false, user: null });
    return;
  }

  jwt.verify(token, SecretKey, async (err, user) => {
    if (err) {
      info('Error is ->>>>>>>', err.message);
      info(true);
      req.authData = { authStatus: false, user: null, err };
      next();
      return;
    }
    const userData = await Users
      .findOne({ email: user.email })
      .populate({
        path: 'friends',
        populate: [
          { path: 'sentRequests', select: ['username', '_id'] },
          { path: 'pendingRequests', select: ['username', '_id'] },
          { path: 'currentFriends', select: ['username', '_id'] },
        ],
      });
    req.authData = { authStatus: true, user: userData, err: null };
    next();
  });
}

function requestLogger(req, res, next) {
  info('Method:', req.method);
  info('Path', req.path);
  info('Body', req.body);
  next();
}

module.exports = {
  authorization,
  requestLogger,
};
