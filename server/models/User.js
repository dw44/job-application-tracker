const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// uniqueValidator added to validate username field

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  secretQuestion: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  secretAnswer: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  jobs: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
