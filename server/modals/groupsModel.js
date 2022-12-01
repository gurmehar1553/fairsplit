const mongoose = require('mongoose');

const groupsSchema = new mongoose.Schema({
  name: String,
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: String,
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  expenses: [{
    name: String,
    id: String,
    paidBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    paidTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    amount: Number,
  }],
});

module.exports = mongoose.model('Group', groupsSchema);
