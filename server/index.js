require('dotenv').config();

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { info } = require('console');
const loginApiHandler = require('./controllers/loginApiHandler');
const signupRouter = require('./controllers/signupRouter');
const friendsRouter = require('./controllers/friendsRouter');
const dashboardRouter = require('./controllers/dashboardRouter');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

mongoose.connect(process.env.DATABASE_URL).then(() => {
  info('Connected to Mongoose Database');
}).catch((e) => {
  info("Couldn't connect to Database due to error: ");
  info(e.message);
});

app.use('/', dashboardRouter);
app.use('/login', loginApiHandler);
app.use('/signup', signupRouter);
app.use('/friends', friendsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(process.env.PORT, () => {
  info('Starting the server at port', process.env.PORT);
});
