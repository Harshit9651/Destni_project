const express = require('express');
const signController = require('../Controllers/signinController.js');
const router = express.Router();
const  { checkUserSignin } = require('../Auth/authentication.js');




router.get('/', signController.rendersigninpage);
router.post('/sigindata',signController.signin)



module.exports = router;