const express = require('express');
const UserController = require('../Controllers/userProfileController.js');
const  { checkUserSignin } = require('../Auth/authentication.js');
const{upload} = require('../middleware/multer.js');
const { route } = require('./signupRoute.js');


const router = express.Router();

router.get('/',UserController.renderProfilePage);
router.post('/profiledata',UserController.profileform)
router.get('/seeprofile',UserController.seeprofile );
router.post('/userbio', checkUserSignin,UserController.userbio)
router.post('/updateprofilephoto',upload.single('croppedImage'),UserController.updateprofilephoto)
router.get('/userprofilephoto',UserController.userprofilephoto );
router.get('/userprofile',UserController.userprofile);





module.exports = router;