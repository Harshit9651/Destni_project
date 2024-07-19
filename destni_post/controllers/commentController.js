const createError = require('http-errors');
const statuscode = require("../helper/statuscode.js");
const statusmessage = require('../helper/statusmessage.js');
const post = require('../models/postModel.js')
const notification = require("../models/notificationModel.js")
const Comment = require("../models/commentModel.js");
const mongoose = require('mongoose')
const { v4: uuidv4, validate: validateUUID } = require('uuid');


exports.rendercommentpage = async(req,res)=>{
    try{
        res.render('comment.ejs');
    }catch(error){
        res.statuscode(500).send({error:"an error accure "})
    }
}


exports.comment = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;
    console.log(postId, userId, comment);

    // Validate input
    if (!postId || !userId || !comment) {
      return res.status(400).send({ error: "Post ID, User ID, and comment are required" });
    }

    // Validate UUIDv4
    if (!validateUUID(postId) ) {
      return res.status(400).send({ error: "Invalid Post ID " });
    }

    const newComment = new Comment({
      comment,
      userId,
      postId
    });

    const savedComment = await newComment.save();

    res.status(200).json({ message: 'Comment saved', comment: savedComment });
  } catch (error) {
    console.error('Error saving comment:', error);
    res.status(500).send({ error: "An error occurred" });
  }
} ;
exports.renderreplypage = async(req,res)=>{
  res.render("commentreply.ejs")

}
exports.createReply = async (req, res) => {
  try {
    const { comment, userId, postId, parentCommentId } = req.body;
    console.log(comment, userId, postId, parentCommentId);


    const newComment = new Comment({
      comment,
      userId,
      postId,
      commentId: parentCommentId // Reference to the parent comment
    });

    await newComment.save();

    res.status(201).json({ message: 'Reply created successfully', newComment });
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).send({ error: 'An error occurred' });
  }
};
exports.getCommentWithReplies = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Fetch comment with its replies populated
    const commentData = await Comment.findById(commentId)
      .populate('replies')
      .exec();

    if (!commentData) {
      return res.status(404).send({ error: 'Comment not found' });
    }

    res.status(200).json({ commentData });
  } catch (error) {
    console.error('Error fetching comment:', error);
    res.status(500).send({ error: 'An error occurred' });
  }
};