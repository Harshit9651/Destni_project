// const bcrypt = require('bcryptjs');
// const User = require('../models/UserprofileModel'); 
// const statusCodes = require('../helper/statusCode');
// const jwt = require('jsonwebtoken');
// const Constants = require('../helper/Constent');
// const Notification = require("../models/notificationModel");

// require('dotenv').config();

// const axios = require('axios')
// // const cloudinary = require('cloudinary').v2;
// const { cloudinary, upload } = require('../middleware/multer');
// const uploadToCloudinary = async (file) => {
//   if (file && file.path) {
//     //const result = await cloudinary.uploader.upload(file.buffer.toString('base64'));
//     const result = await cloudinary.uploader.upload(file.path);
//     return result.secure_url;
//   } else {
//     throw new Error('File buffer is undefined or null');
//   }
// };



// exports.renderProfilePage = (req, res) => {
//   try {
//     res.render('userprofile.ejs');
//   } catch (error) {
//     res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Error occurred while rendering the signup page' });
//   }
// };





// exports.profileform = async (req, res) => {
//   const { fname, lname, city, state, pincode, pnumber } = req.body;
//   console.log(fname, lname, city, state, pincode, pnumber);

//   const userId = req.session.userId;
//   console.log(userId);

//   if (!userId) {
//     return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please Signin' });
//   }

//   if (!fname || !lname || !city || !state || !pincode || !pnumber) {
//     return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please fill all sections correctly' });
//   }

//   // Validation
//   const phoneNumberPattern = /^\d{10}$/;
//   if (!phoneNumberPattern.test(pnumber)) {
//     return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Phone number must be a 10-digit number' });
//   }

//   const pincodePattern = /^\d{6}$/;
//   if (!pincodePattern.test(pincode)) {
//     return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Pincode must be a 6-digit number' });
//   }

//   const namePattern = /^[a-zA-Z]+$/;
//   if (!namePattern.test(fname)) {
//     return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'First name can only contain letters' });
//   }
//   if (!namePattern.test(lname)) {
//     return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Last name can only contain letters' });
//   }
//   if (!namePattern.test(city)) {
//     return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'City can only contain letters' });
//   }
//   if (!namePattern.test(state)) {
//     return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'State can only contain letters' });
//   }

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ userId: userId });
//     if (existingUser) {
//       return res.status(statusCodes.CLIENT_ERROR.CONFLICT.code).json({ error: 'User profile already exists' });
//     }

//     const newUser = new User({
//       fname,
//       lname,
//       city,
//       state,
//       pincode,
//       pnumber,
//       userId: userId
//     });

//     const userProfile = await newUser.save();
//     console.log(userProfile);

//     res.redirect('http://localhost:3001/user/profile/seeprofile');
//   } catch (err) {
//     console.error(err);
//     res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Internal server error' });
//   }
// };




// exports.userbio = async(req,res)=>{
//    try {
//         const { bio } = req.body;
//          const UserId = req.session.userId;
//         const checkuser = await User.findOne({userId:UserId});
//         if(!checkuser){
//           console.log('user is not exisect ')
//         }
//         const updatedBio = await User.findOneAndUpdate(
//           { userId:UserId },
//           { bio },               
//           { new: true }            
//         );
//         const message = `hy ${checkuser.fname} you just update your Bio `
//         const addnotification = new Notification({userId:req.session.userId,message: message});
//         const saveNotification =  await addnotification.save();
//         console.log(saveNotification);

//         res.status(200).json({ message: 'Bio updated successfully' });
//         console.log(updatedBio);
//       } catch (error) {
//          res.status(500).json({ error: 'Error updating bio' });
//        }

// }
// exports.updateprofilephoto= async (req,res)=>{
 
//     try {
//       const uploadToCloudinary = async (file) => {
//         if (file && file.path) {
//           const result = await cloudinary.uploader.upload(file.path);
//           return result.secure_url;
//         } else {
//           throw new Error('File buffer is undefined or null');
//         }
//       };
    
//       const imageFile = req.file; // Change to req.file since we are uploading a single file
//       const IMAGE = await uploadToCloudinary(imageFile);
//       const UserId = req.session.userId;
//       const checkuser = await User.findOne({userId:UserId});
//       if(!checkuser){
//    res.send(500).status('user not found')
//       }
//       const message = `hy ${checkuser.fname} you just update your profile photo `
//       const addnotification = new Notification({userId:req.session.userId,message: message});
//       const saveNotification =  await addnotification.save();
//       console.log(saveNotification);
//       const profileUpdated = await User.findOneAndUpdate(
//         { userId: req.session.userId },
//         { photo: IMAGE },
//         { new: true }
//       );
      
//       console.log(profileUpdated);
//       res.status(200).send('Profile photo updated successfully');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Failed to update profile photo');
//     }

// }
// exports.seeprofile = async (req, res) => {
//   const UserId = req.session.userId;
//   try {
//     const checkuser = await User.findOne({userId: UserId });
//     console.log( 'useserid:',UserId)
//     if (!checkuser) {
//       return res.redirect('http://localhost:3001/user/profile/');
//     }else{

  
//    const username = checkuser.fname + " "+checkuser.lname;
//    const City = checkuser.city;
//    const State= checkuser.state;  
//    const Pincode = checkuser.pincode;
//    const PhoneNumber = checkuser.pnumber;

//     const   profilephoto=checkuser.photo
//       const Bio =  checkuser.bio
//       console.log(`user photo is here ${profilephoto} and user Bio is ${Bio} ,user fname ${username}, user city ${City}, ${State}, ${Pincode}, ${PhoneNumber}`)
//     res.render('seeyourprofile.ejs', {
//   profilephoto,
//   Bio,
//   username,
//   State,
//   City,
//   Pincode,
//   PhoneNumber
//     });}
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// // exports.userprofilephoto = async (req, res) => {
// //   const UserId = req.session.userId;
// //   try {
// //     const checkuser = await User.findOne({userId: UserId });
// //     if (!checkuser) {
// //       return res.status(404).send("User not found");
// //     }
// // res.send(checkuser.photo);
 
   
// //   } catch (error) {
// //     console.error('Error fetching user profile:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // };

// // exports.userprofile = async(req,res)=>{
// //   const UserId = req.session.userId;
// //   try {
// //     const user = await User.findOne({ userId: UserId });
// //     if (!user) {

// //      res.render('userprofile.ejs')
// //     }
// //     else{res.send(user);}

 
   
// //   } catch (error) {
// //     console.error('Error fetching user profile:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // }
// exports.userprofile = async (req, res) => {
//   const UserId = req.session.userId;
//   console.log('Fetching profile for userId:', UserId); // Debugging line
//   try {
//     const user = await User.findOne({ userId: UserId });
//     if (!user) {
//       console.log('User not found'); // Debugging line
//       return res.render('userprofile.ejs');
//     }
//     console.log('User found:', user); // Debugging line
//     res.send(user);
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// // Fetch User Profile Photo
// exports.userprofilephoto = async (req, res) => {
//   const UserId = req.session.userId;
//   try {
//     const user = await User.findOne({ userId: UserId });
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send(user.photo);
//   } catch (error) {
//     console.error('Error fetching user profile photo:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// // Fetch User Profile
// exports.userprofile = async (req, res) => {
//   const UserId = req.session.userId;
//   try {
//     const user = await User.findOne({ userId: UserId });
//     if (!user) {
//       console.log('User not found'); // Debugging line
//       return res.render('userprofile.ejs');
//     }
//     console.log('User found:', user); // Debugging line
//     res.send(user);
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

const bcrypt = require('bcryptjs');
const User = require('../models/UserprofileModel'); 
const statusCodes = require('../helper/statusCode');
const jwt = require('jsonwebtoken');
const Constants = require('../helper/Constent');
const Notification = require("../models/notificationModel");

require('dotenv').config();

const axios = require('axios');
const { cloudinary, upload } = require('../middleware/multer');

const uploadToCloudinary = async (file) => {
  if (file && file.path) {
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
  const userId = req.session.userId;

  if (!userId) {
    return res.status(statusCodes.CLIENT_ERROR.BAD_REQUEST.code).json({ error: 'Please Signin' });
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
    // Check if the user already exists
    const existingUser = await User.findOne({ userId: userId });
    if (existingUser) {
      return res.status(statusCodes.CLIENT_ERROR.CONFLICT.code).json({ error: 'User profile already exists' });
    }

    const newUser = new User({
      fname,
      lname,
      city,
      state,
      pincode,
      pnumber,
      userId: userId
    });

    const userProfile = await newUser.save();
    res.redirect('/user/profile/seeprofile');
  } catch (err) {
    console.error(err);
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Internal server error' });
  }
};

exports.userbio = async (req, res) => {
  try {
    const { bio } = req.body;
    const userId = req.session.userId;

    const checkuser = await User.findOne({ userId: userId });
    if (!checkuser) {
      return res.status(statusCodes.CLIENT_ERROR.NOT_FOUND.code).json({ error: 'User not found' });
    }

    const updatedBio = await User.findOneAndUpdate(
      { userId: userId },
      { bio },               
      { new: true }            
    );

    const message = `Hey ${checkuser.fname}, you just updated your Bio.`;
    const addnotification = new Notification({ userId: req.session.userId, message: message });
    const saveNotification = await addnotification.save();

    res.status(200).json({ message: 'Bio updated successfully' });
  } catch (error) {
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Error updating bio' });
  }
};

exports.updateprofilephoto = async (req, res) => {
  try {
    const imageFile = req.file; // Change to req.file since we are uploading a single file
    const IMAGE = await uploadToCloudinary(imageFile);
    const userId = req.session.userId;

    const checkuser = await User.findOne({ userId: userId });
    if (!checkuser) {
      return res.status(statusCodes.CLIENT_ERROR.NOT_FOUND.code).json({ error: 'User not found' });
    }

    const message = `Hey ${checkuser.fname}, you just updated your profile photo.`;
    const addnotification = new Notification({ userId: req.session.userId, message: message });
    const saveNotification = await addnotification.save();

    const profileUpdated = await User.findOneAndUpdate(
      { userId: userId },
      { photo: IMAGE },
      { new: true }
    );

    res.status(statusCodes.SUCCESS.OK.code).json({ message: 'Profile photo updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: 'Failed to update profile photo' });
  }
};

exports.seeprofile = async (req, res) => {
  const userId = req.session.userId;
  try {
    const checkuser = await User.findOne({ userId: userId });
    if (!checkuser) {
      return res.redirect('/user/profile/');
    }

    const username = `${checkuser.fname} ${checkuser.lname}`;
    const city = checkuser.city;
    const state = checkuser.state;  
    const pincode = checkuser.pincode;
    const phoneNumber = checkuser.pnumber;
    const profilePhoto = checkuser.photo;
    const Bio = checkuser.bio;

    res.render('seeyourprofile.ejs', {
      profilePhoto,
      Bio,
      username,
      state,
      city,
      pincode,
      phoneNumber
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).send('Internal Server Error');
  }
};

exports.userprofilephoto = async (req, res) => {
  const userId = req.session.userId;
  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(statusCodes.CLIENT_ERROR.NOT_FOUND.code).send("User not found");
    }
    res.send(user.photo);
  } catch (error) {
    console.error('Error fetching user profile photo:', error);
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).send('Internal Server Error');
  }
};

exports.userprofile = async (req, res) => {
  const userId = req.session.userId;
  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.render('userprofile.ejs');
    }
    res.send(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(statusCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).send('Internal Server Error');
  }
};
