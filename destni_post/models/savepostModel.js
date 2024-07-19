// models/Report.js
const mongoose = require('mongoose');

const savepostSchema = new mongoose.Schema({
 
  userId: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    ref: 'Post'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SavePost', savepostSchema);
