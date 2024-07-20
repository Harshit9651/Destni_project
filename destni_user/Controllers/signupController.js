const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/signupModel.js');
const statusCodes = require('../helper/statuscode.js');
require('dotenv').config();
const { JWT_SECRET } = process.env;
exports.renderSignupPage =(req,res)=>{
    res.render("signup.ejs");
}
exports.signup = async (req, res) => {
  const { username, password, email } = req.body;


  if (!username || !password || !email) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please fill all sections correctly' });
  }

  if (username.length < 4 || username.length > 30) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Username must be between 4 and 30 characters long' });
  }


  if (password.length < 6) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Password must be at least 6 characters long' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Invalid email format' });
  }

  try {
   
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(statusCodes.CLIENT_ERROR.CONFLICT.code).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    req.session.userId = newUser._id;
    console.log(req.session.userId)
    res.status(statusCodes.SUCCESS.CREATED.code).json({ message: 'User created successfully', token });
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Internal server error' });
  }
};
