const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        return /https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)/.test(v);
      },
      message: 'Invalid image URL',
    },
  },
  fname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
  },
  photo: {
    type: String,
    // required: [true, 'State is required'],
    // trim: true,
  },
  bio: {
    type: String,
    // required: [true, 'State is required'],
    // trim: true,
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v);
      },
      message: 'Pincode must be a 6-digit number',
    },
  },
  pnumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number must be a 10-digit number',
    },
  },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userProfileSchema);
