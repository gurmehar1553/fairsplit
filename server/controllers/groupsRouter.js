/* eslint-disable no-underscore-dangle */
const groupsRouter = require('express').Router();
const Groups = require('../modals/groupsModel');
const Users = require('../modals/userModals');
const { info } = require('../utils/logger');
const { authorization } = require('../utils/middleware');

groupsRouter.post('/', authorization, async (req, res) => {
  const groupData = req.body;
  groupData.expenses = [];
  const modeledGroupData = new Groups(groupData);
  const savedData = await modeledGroupData.save();

  const { members } = groupData;
  members.forEach(async (e) => {
    const usr = await Users.findById(e);
    usr.groups.push(modeledGroupData._id);
    usr.save();
    info(usr);
  });

  info(savedData);
  res.send(true);
});

groupsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const group = await Groups.findById(id)
    .populate({ path: 'expenses', populate: [{ path: 'paidBy' }, { path: 'paidTo' }] })
    .populate('members');
  info('This is found Group ->>>', group);
  res.send(group);
});

groupsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const expense = req.body;
  const group = await Groups.findById(id);
  info(expense);
  info(group);
  group.expenses.push(expense);
  info(group);
  await group.save();
  const populatedGroup = await Groups.findById(id)
    .populate({ path: 'expenses', populate: [{ path: 'paidBy' }, { path: 'paidTo' }] })
    .populate('members');
  info('Saved User', populatedGroup);
  res.send(populatedGroup);
  // res.send(group);
});

module.exports = groupsRouter;
