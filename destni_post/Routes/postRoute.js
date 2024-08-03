const express = require("express");
const router = express.Router();
const{upload} = require('../middleware/multer')
const  postController = require("../controllers/postController");
const{authenticateUser} = require('../Auth/authentication');
router.get('/createPost',postController.renderPostPage);
router.post('/posts/create',upload.fields([{ name: 'Image', maxCount: 1 }]),postController.postAction)
// router.get('/like',postController.likePost);
router.get("/renderpostdetail",postController.renderpostdetailpage);
router.post('/postdetail',postController.getPostWithDetails);
router.get('/renderallposts',postController.listAllposts);
// router.get('/userprofile',authenticateUser,postController.userpostes);
router.get('/userposts',authenticateUser,postController.userposts );
router.get('/userpostcount',authenticateUser,postController.userpostscount);






module.exports = router;
