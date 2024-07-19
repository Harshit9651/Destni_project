const { required } = require('joi');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  caption: {
    type: String
  },
  postImageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    enum: ['video', 'photo'],
    default: 'photo'
  },
  postStatus: {
    type: String,
    enum: ['publish', 'draft', 'hidden'],
    default: 'draft'
  },
  audienceVisibility: {
    type: Number, // 0 == only me , 1 == friends , 2 == fof , 3 = public
    default: 1
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
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

postSchema.virtual('likes', {
  ref: 'Like',
  localField: 'postId',
  foreignField: 'postId'
});

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: 'postId',
  foreignField: 'postId'
});

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
