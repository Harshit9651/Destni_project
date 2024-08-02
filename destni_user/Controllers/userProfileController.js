const bcrypt = require('bcryptjs');
const User = require('../models/UserprofileModel'); 
const statusCodes = require('../helper/statusCode');
const jwt = require('jsonwebtoken');
const Constants = require('../helper/Constent');
const Notification = require("../models/notificationModel");

require('dotenv').config();

const axios = require('axios')
// const cloudinary = require('cloudinary').v2;
const { cloudinary, upload } = require('../middleware/multer');
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



exports.userbio = async(req,res)=>{
   try {
        const { bio } = req.body;
         const UserId = req.session.userId;
        const checkuser = await User.findOne({userId:UserId});
        if(!checkuser){
          console.log('user is not exisect ')
        }
        const updatedBio = await User.findOneAndUpdate(
          { userId: UserId },
          { bio },               
          { new: true }            
        );
        const message = `hy ${checkuser.fname} you just update your Bio `
        const addnotification = new Notification({userId:req.session.userId,message: message});
        const saveNotification =  await addnotification.save();
        console.log(saveNotification);

        res.status(200).json({ message: 'Bio updated successfully' });
        console.log(updatedBio);
      } catch (error) {
         res.status(500).json({ error: 'Error updating bio' });
       }

}
exports.updateprofilephoto= async (req,res)=>{
 
    try {
      const uploadToCloudinary = async (file) => {
        if (file && file.path) {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        } else {
          throw new Error('File buffer is undefined or null');
        }
      };
    
      const imageFile = req.file; // Change to req.file since we are uploading a single file
      const IMAGE = await uploadToCloudinary(imageFile);
      const UserId = req.session.userId;
      const checkuser = await User.findOne({userId:UserId});
      if(!checkuser){
   res.send(500).status('user not found')
      }
      const message = `hy ${checkuser.fname} you just update your profile photo `
      const addnotification = new Notification({userId:req.session.userId,message: message});
      const saveNotification =  await addnotification.save();
      console.log(saveNotification);
      const profileUpdated = await User.findOneAndUpdate(
        { userId: req.session.userId },
        { photo: IMAGE },
        { new: true }
      );
      
      console.log(profileUpdated);
      res.status(200).send('Profile photo updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to update profile photo');
    }

}
exports.seeprofile = async (req, res) => {
  const UserId = req.session.userId;
  try {
    const checkuser = await User.findOne({ userId: UserId });
    if (!checkuser) {
      return res.status(404).send("User not found");
    }

  
   const   name =checkuser.name
    const   profilephoto=checkuser.profilephoto
      const Bio =  checkuser.bio
    res.render('seeyourprofile.ejs', {profilephoto});
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.userprofilephoto = async (req, res) => {
  const UserId = req.session.userId;
  try {
    const checkuser = await User.findOne({ userId: UserId });
    if (!checkuser) {
      return res.status(404).send("User not found");
    }
res.send(checkuser.photo);
 
   
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Internal Server Error');
  }
};
