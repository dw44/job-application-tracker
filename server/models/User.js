const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// uniqueValidator added to validate username field

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
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
  secretQuestion: {
    // hardcode questions in frontend
    type: String,
    required: true,
    maxLength: 100,
  },
  secretAnswerHash: {
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
