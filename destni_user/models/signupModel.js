const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [4, 'Username must be at least 4 characters long'],
    maxlength: [30, 'Username must be less than 30 characters long'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
  
  },
  },
 { timestamps: true });

module.exports = mongoose.model('Signup', signupSchema);
