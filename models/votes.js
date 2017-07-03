const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  votedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  votedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  participatedAt: { type: Date },
  comment: { type: String },
  voteResult: { type: Boolean, required: true }
});

const voteClass = mongoose.model('vote', voteSchema);

voteSchema.pre('save', function (next) {
  this.updatedAt = new Date().getTime();
  next();
});

module.exports = voteClass;
