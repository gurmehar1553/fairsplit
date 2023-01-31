require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const path = require('path');
const { info } = require('./utils/logger');

const loginApiHandler = require('./controllers/loginApiHandler');
const signupRouter = require('./controllers/signupRouter');
const friendsRouter = require('./controllers/friendsRouter');
const dashboardRouter = require('./controllers/dashboardRouter');
const { requestLogger } = require('./utils/middleware');
const groupsRouter = require('./controllers/groupsRouter');
const { ShowError } = require('./utils/logger');

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}
app.use(express.static('build'));
app.use(requestLogger);

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

mongoose.connect(process.env.DATABASE_URL).then(() => {
  info('Connected to Mongoose Database');
}).catch((e) => {
  ShowError("Couldn't connect to Database due to error: ");
  ShowError(e.message);
});

app.use('/', dashboardRouter);
app.use('/login', loginApiHandler);
app.use('/signup', signupRouter);
app.use('/friends', friendsRouter);
app.use('/groups', groupsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

module.exports = app;
