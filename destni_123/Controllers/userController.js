const bcrypt = require('bcryptjs');
const User = require('../models/UserModel.js'); 
const statusCodes = require('../helper/statuscode.js');
const jwt = require('jsonwebtoken');
const Constants = require('../helper/Constent.js');
require('dotenv').config();
const { JWT_SECRET } = process.env;

exports.signup = async (req, res) => {
  try {
    const { fname } = req.body; 

    console.log(fname); 

    res.status(statusCodes.SUCCESS.OK.code).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.renderSignupPage = (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Error occurred while rendering the signup page' });
  }
};

exports.signupform = async (req, res) => {
  const { username, password, fname, lname, city, state, pincode, pnumber } = req.body;
  console.log(username, password, fname, lname, city, state, pincode, pnumber);

  if (!username || !password || !fname || !lname || !city || !state || !pincode || !pnumber) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please fill all sections correctly' });
  }

  if (password.length < 6) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Password must be at least 6 characters long' });
  }

  const phoneNumberPattern = /^\d{10}$/;
  if (!phoneNumberPattern.test(pnumber)) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Phone number must be a 10-digit number' });
  }

  const pincodePattern = /^\d{6}$/;
  if (!pincodePattern.test(pincode)) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Pincode must be a 6-digit number' });
  }

  const namePattern = /^[a-zA-Z]+$/;
  if (!namePattern.test(fname)) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'First name can only contain letters' });
  }
  if (!namePattern.test(lname)) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Last name can only contain letters' });
  }
  if (!namePattern.test(city)) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'City can only contain letters' });
  }
  if (!namePattern.test(state)) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'State can only contain letters' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, Constants.Hashing_PASSWORD);

    const newUser = new User({
      username,
      password: hashedPassword,
      fname,
      lname,
      city,
      state,
      pincode,
      pnumber
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
exports.rendersigninpage =async(req,res)=>{
res.render('signin.ejs')
}


exports.signin = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please provide both username and password' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(statusCodes.CLIENT_ERROR.UNAUTHORIZED.code).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(statusCodes.CLIENT_ERROR.UNAUTHORIZED.code).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: Constants.session_Expire });
    res.cookie('token', token, { httpOnly: true, secure: false });

    req.session.userId = user._id;
    console.log('Session set userId:', req.session.userId);

    res.status(statusCodes.SUCCESS.OK.code).json({ message: 'Signin successful', token });
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Internal server error' });
  }
};


