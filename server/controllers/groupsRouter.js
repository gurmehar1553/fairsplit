/* eslint-disable no-underscore-dangle */
const groupsRouter = require('express').Router();
const Groups = require('../modals/groupsModel');
const Users = require('../modals/userModals');
const { info } = require('../utils/logger');
const { authorization } = require('../utils/middleware');

groupsRouter.post('/', authorization, async (req, res) => {
  try {
    const groupData = req.body;
    groupData.expenses = [];
    const modeledGroupData = new Groups(groupData);
    const savedData = await modeledGroupData.save();
    const { members } = groupData;
    members.forEach(async (e) => {
      const usr = await Users.findById(e);
      usr.groups.push(modeledGroupData._id);
      await usr.save();
      info(usr);
    });
    info(savedData);
    res.send({
      status: true,
      message: 'Group Created',
    });
  } catch (e) {
    res.send({
      status: false,
      message: `Group creation failed due to: ${e.message}`,
    });
  }
});
groupsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Groups.findById(id)
      .populate({ path: 'expenses', populate: [{ path: 'paidBy' }, { path: 'paidTo' }] })
      .populate('members');
    info('This is found Group ->>>', group);
    res.send({
      status: true,
      message: 'Group Found',
      group,
    });
  } catch (e) {
    res.send({
      status: false,
      message: `Unable to fetch group data due to ${e.message} `,
      group: null,
    });
  }
});
groupsRouter.delete('/:id', authorization, async (req, res) => {
  const { id } = req.params;
  const { user } = req.authData;
  info(id);
  info(user);
  const group = await Groups.findById(id);
  info(group);
  if (group.leader._id.toString() === user._id.toString()) {
    await group.remove();
    res.send({
      status: true,
      message: 'Group Deleted',
    });
    return;
  }
  res.send({
    status: false,
    message: 'Only leader can delete the group',
  });
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
  res.send({
    status: true,
    message: 'Expense Added',
    group: populatedGroup,
  });
});

groupsRouter.delete('/:id/expense/:eid', async (req, res) => {
  try {
    const { id, eid } = req.params;
    const group = await Groups.findById(id);
    info(group);
    group.expenses = group.expenses.filter((e) => e.id !== eid);
    info(group);
    await group.save();
    const populatedGroup = await Groups.findById(id)
      .populate({ path: 'expenses', populate: [{ path: 'paidBy' }, { path: 'paidTo' }] })
      .populate('members');
    info('Saved User', populatedGroup);
    res.send({
      status: true,
      message: 'Expense Deleted',
      group: populatedGroup,
    });
  } catch (e) {
    res.send({
      status: true,
      message: `Could not delete expense: ${e.message}`,
      group: null,
    });
  }
});

module.exports = groupsRouter;
