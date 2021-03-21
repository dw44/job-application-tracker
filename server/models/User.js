const mongoose = require('mongoose');

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
  username: {

  },
  jobs: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

module.exports = mongoose.model('Job', userSchema);
