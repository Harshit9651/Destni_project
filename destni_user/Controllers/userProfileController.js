const bcrypt = require('bcryptjs');
const User = require('../models/UserprofileModel'); 
const statusCodes = require('../helper/statusCode');
const jwt = require('jsonwebtoken');
const Constants = require('../helper/Constent');
require('dotenv').config();



exports.renderProfilePage = (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Error occurred while rendering the signup page' });
  }
};





exports.profileform = async (req, res) => {
  const { fname, lname, city, state, pincode, pnumber } = req.body;
  console.log(fname, lname, city, state, pincode, pnumber);

  if (!fname || !lname || !city || !state || !pincode || !pnumber) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please fill all sections correctly' });
  }

  // Validation
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
    const newUser = new User({
      fname,
      lname,
      city,
      state,
      pincode,
      pnumber
    });

  const userprofile =   await newUser.save();
console.log(userprofile);


    res.status(statusCodes.SUCCESS.CREATED.code).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Internal server error' });
  }
};