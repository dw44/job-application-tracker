const mongoose = require('mongoose');

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
    // 1 - Applied; 2 - Interview(ing); 3 - Rejected; 4 - Ghosted; 5 - Accepted
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  link: String,
  notes: String,
  user: mongoose.Schema.Types.ObjectId,
  markedTrash: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Job', jobSchema);
