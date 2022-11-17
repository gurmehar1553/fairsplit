const dashboardRouter = require('express').Router();
const solve = require('../logic/logic');
const { info } = require('../utils/logger');

dashboardRouter.post('/handlePost', (req, res) => {
  info('Req on handlePost');
  const obj = req.body;
  const query = obj.pop();

  const finalArr = solve(obj, query);
  res.json(finalArr);
});

module.exports = dashboardRouter;
