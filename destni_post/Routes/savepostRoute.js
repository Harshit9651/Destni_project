const express = require("express");
const router = express.Router();
const savepostController = require("../controllers/savepostController");
const{authenticateUser} = require("../Auth/authentication")
router.get('/rendersavepage',savepostController.rendersavepostpage)
router.post('/savepostdata/:postId',authenticateUser,savepostController.savePost);


module.exports = router;