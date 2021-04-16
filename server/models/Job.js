const mongoose = require('mongoose');

// #TODO - Handle date through a library
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  city: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  company: {
    type: String,
    required: true,
    maxLength: 50,
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    default: 1,
    // 1 - Applied; 2 - Interview(ing); 3 - Rejected; 4 - Ghosted; 5 - Accepted
  },
  tags: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  link: String,
  notes: String,
  // #TODO : ADD user later
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  markedTrash: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Job', jobSchema);
