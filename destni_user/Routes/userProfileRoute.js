const express = require('express');
const UserController = require('../Controllers/userProfileController.js');
const  { checkUserSignin } = require('../Auth/authentication.js');


const router = express.Router();

router.get('/',UserController.renderProfilePage);
router.post('/profiledata',UserController.profileform)
router.post('/update-bio',UserController.updatedBio);
router.post('/update-profile-photo',UserController.updatedBio);



module.exports = router;