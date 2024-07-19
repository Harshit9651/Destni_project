const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  postId: {
    type: String, // Define postId as a string
    required: true
  },
  userId: {
    type: String, // Define userId as a string
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Like', likeSchema);
