/* eslint-disable no-underscore-dangle */
const dashboardRouter = require('express').Router();
const solve = require('../logic/logic');
const { info } = require('../utils/logger');

dashboardRouter.post('/handlePost', async (req, res) => {
  try {
    info('Req on handlePost');
    const obj = req.body;
    const { expenses, query, members } = obj;
    const mappedMembers = members.map((e) => e._id.toString());
    const finalArr = solve(expenses, query, mappedMembers);
    // eslint-disable-next-line no-return-assign, prefer-destructuring
    const userifiedFinalArr = finalArr.map((e) => ({ ...e, to: members.filter(({ _id }) => _id.toString() === e.to)[0] }));
    info('userifiedFinalArr', userifiedFinalArr);
    res.json({
      status: true,
      message: 'Showing Result',
      result: userifiedFinalArr,
    });
  } catch (e) {
    res.json({
      status: false,
      message: `Unable to get the results due to ${e.message}`,
      result: null,
    });
  }
});

module.exports = dashboardRouter;
