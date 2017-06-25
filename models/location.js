const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  active: { type: Boolean, default: true },
  name: { type: String },
  description: { type: String },
  address: { type: String },
  phone_numbers: { type: [String] },
  longitude: { type: String },
  latitude: { type: String },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio'
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    }
  ]
});

const locationClass = mongoose.model('location', locationSchema);

locationSchema.pre('save', function (next) {
  this.updatedAt = new Date().getTime();
  next();
});

module.exports = locationClass;
