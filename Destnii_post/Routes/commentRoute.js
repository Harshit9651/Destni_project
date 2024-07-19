const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/commentController");
router.get('/commentpage',CommentController.rendercommentpage);
router.post("/check",CommentController.comment);



module.exports = router;
