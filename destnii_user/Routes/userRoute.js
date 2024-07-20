const express = require('express');
const UserController = require('../Controllers/userController.js');
const  { checkUserSignin } = require('../Auth/authentication.js');


const router = express.Router();

router.get('/signup', UserController.renderSignupPage);
router.get('/sigin',UserController.rendersigninpage)
router.post('/signupdata', UserController.signupform);
router.post('/signin',UserController.signin)

// Protected routes
router.get('/protectedRoute', checkUserSignin, (req, res) => {
  res.json({ message: 'You have accessed a protected route!', user: req.user });
  });
module.exports = router;