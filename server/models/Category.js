const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  jobs: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

module.exports = mongoose.model('Job', categorySchema);
