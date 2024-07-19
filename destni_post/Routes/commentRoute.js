const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentController");
router.get('/commentpage',CommentController.rendercommentpage);
router.get('/reply',CommentController.renderreplypage);
router.post("/check",CommentController.comment);
router.post('/repaly',CommentController.createReply);




module.exports = router;
