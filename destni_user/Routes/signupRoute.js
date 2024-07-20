const express = require('express');
const signupController = require('../Controllers/signupController.js');
const router = express.Router();
const  { checkUserSignin } = require('../Auth/authentication.js');




 router.get('/', signupController.renderSignupPage);
router.post('/signupdata',signupController.signup)



module.exports = router;