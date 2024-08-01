const express = require('express');
const UserController = require('../Controllers/userProfileController.js');
const  { checkUserSignin } = require('../Auth/authentication.js');
const{upload} = require('../middleware/multer.js')


const router = express.Router();

router.get('/',UserController.renderProfilePage);
router.post('/profiledata',UserController.profileform)
router.post('/update-profile-photo',upload.fields([{ name: 'croppedImage', maxCount: 1 }]),UserController.updateuserprofilephoto);
// router.get('/profilephoto',UserController.userprofilephoto);
router.get('/seeprofile',UserController.sellYourProfile);
router.post('/userbio', checkUserSignin,UserController.userbio)




module.exports = router;