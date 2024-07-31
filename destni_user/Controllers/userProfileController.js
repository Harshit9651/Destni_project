const bcrypt = require('bcryptjs');
const User = require('../models/UserprofileModel'); 
const statusCodes = require('../helper/statusCode');
const jwt = require('jsonwebtoken');
const Constants = require('../helper/Constent');
require('dotenv').config();
const axios = require('axios')
const cloudinary = require('cloudinary').v2;
const uploadToCloudinary = async (file) => {
  if (file && file.path) {
    //const result = await cloudinary.uploader.upload(file.buffer.toString('base64'));
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } else {
    throw new Error('File buffer is undefined or null');
  }
};



exports.renderProfilePage = (req, res) => {
  try {
    res.render('userprofile.ejs');
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Error occurred while rendering the signup page' });
  }
};





exports.profileform = async (req, res) => {
  const { fname, lname, city, state, pincode, pnumber } = req.body;
  console.log(fname, lname, city, state, pincode, pnumber);

  const userid = req.session.userId;
  console.log(userid);
  if(!userid){
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please Signin ' });
  }
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
      pnumber,
      userId:req.session.userId
    });

  const userprofile =   await newUser.save();
console.log(userprofile);


    res.status(statusCodes.SUCCESS.CREATED.code).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Internal server error' });
  }
};
exports.updatedBio = async (req, res) => {
  try {
    const { bio } = req.body;
    const userId = req.user.id;
    console.log(userId) 
    console.log(bio);
    await User.findByIdAndUpdate(userId, { bio });
    res.status(200).json({ message: 'Bio updated successfully' });
    console.log("Bio updated successfully");
  } catch (error) {
    res.status(500).json({ error: 'Error updating bio' });
  }
};
exports.updateuserprofilephoto  = async(req,res)=>{
  const imageFile = req.files['croppedImage'][0];
  const IMAGE = await uploadToCloudinary(imageFile);
  const profileupdate = User.findByIdAndUpdate({_id:req.session.userId,photo:IMAGE})
  console.log(profileupdate)

  
}
exports.sellYourProfile = async(req,res)=>{
  const userId = req.session.userId;
  //const Userprofile = await User.findOne({userId:req.session.userId});
//const Posts = axios.get('http://localhost:3002/destni_post/userprofile')
  res.render('seeyourprofile.ejs');

}