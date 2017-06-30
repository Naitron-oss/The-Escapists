const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  password: { type: String },
  isAdmin: { type: Boolean, default: false }
});

// https://stackoverflow.com/questions/39166700/the-this-object-is-empty-in-presave
// Not to use ES6 arrow syntax in before hook
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      user.updatedAt = new Date().getTime();
      next();
    });
  });
});

userSchema.pre('save', function (next) {
  const user = this;

  user.updatedAt = new Date().getTime();
  next();
});

const userClass = mongoose.model('user', userSchema);

userClass.validator = (attributes) => {
  const email = attributes.email,
        password = attributes.password

  let errors = []

  if (!email || email.length == 0) { errors.push('Email is requried'); }
  if (!password || password.length == 0) { errors.push('Password is requried'); }

  if (password && password.length > 0 && password.length < 8) { errors.push('Password is too short'); }

  return errors;
}

userClass.generateToken = (user) => {
  let timestamp = new Date().getTime();

  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, process.env.APP_SECRET);
}

userClass.comparePassword = function (user, candidatePassword, callback) {
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

module.exports = userClass;
