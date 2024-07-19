// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  report: {
    type: String
  },
  Reprotedby: {
    type: String,

    required: true
  },
  postId: {
    type:String,

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

module.exports = mongoose.model('Report', reportSchema);
