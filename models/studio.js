const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studioSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  active: { type: Boolean, default: true },
  name: { type: String },
  description: { type: String },
  slug: { type: String, unique: true, lowercase: true },
  links: Schema.Types.Mixed,
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }],
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }]
});

const studioClass = mongoose.model('studio', studioSchema);

studioSchema.pre('save', function (next) {
  this.updatedAt = new Date().getTime();
  next();
});

module.exports = studioClass;
