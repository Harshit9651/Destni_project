const express = require("express");
const router = express.Router();
const{authenticateUser} = require("../Auth/authentication")
const LikeController = require("../controllers/likeController");
router.post('/like_unlike_post/:postId',authenticateUser,LikeController.likePost);






module.exports = router;
