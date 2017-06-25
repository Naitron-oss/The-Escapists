const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  active: { type: Boolean, default: true },
  name: { type: String },
  slug: { type: String, unique: true, lowercase: true },
  description: { type: String },
  story: { type: String },
  link: { type: String },
  player_quantity: { type: String },
  price: { type: String },
  available_preservation: { type: String },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio'
  },
  locatedAt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }
});

const gameClass = mongoose.model('game', gameSchema);

gameSchema.pre('save', function (next) {
  this.updatedAt = new Date().getTime();
  next();
});

module.exports = gameClass;
