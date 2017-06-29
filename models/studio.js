const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studioSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  active: { type: Boolean, default: true },
  name: { type: String },
  description: { type: String },
  slug: { type: String, unique: true, lowercase: true },
  links: Schema.Types.Mixed
});

const studioClass = mongoose.model('studio', studioSchema);

studioSchema.pre('save', function (next) {
  this.updatedAt = new Date().getTime();
  next();
});

studioClass.queryByArgs = function (query, callback) {
  let filter = {};

  ['name', 'description', 'slug'].forEach((key) => {
    if (query[key] !== undefined) { filter[key] = new RegExp(query[key], 'ig'); }
  });

  studioClass.find(filter).exec(callback);
}

module.exports = studioClass;
