const express = require("express");
const router = express.Router();
const  postController = require("../controllers/postController");
const{authenticateUser} = require('../Auth/authentication');
router.get('/createPost',postController.renderPostPage);
router.post('/posts/create',postController.postAction)
router.get('/like',postController.likePost);






module.exports = router;
