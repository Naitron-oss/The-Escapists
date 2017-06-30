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
  games: [
    {
      active: { type: Boolean, default: true },
      name: { type: String },
      slug: { type: String, unique: true, lowercase: true },
      description: { type: String },
      story: { type: String },
      link: { type: String },
      player_quantity: { type: String },
      price: { type: String },
      available_preservation: { type: String },
      address: { type: String },
      phone_numbers: { type: [String] },
      longitude: { type: String },
      latitude: { type: String }
    }
  ]
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
