

const createError = require('http-errors');
const statuscode = require("../helper/statuscode.js");
const statusmessage = require('../helper/statusmessage.js');
const post = require('../models/postModel.js')
const notification = require("../models/notificationModel.js")
const Comment = require("../models/commentModel.js");
const mongoose = require('mongoose')


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
  console.log(postId, userId, comment)
      // Validate input
      if (!postId || !userId || !comment) {
        return res.status(400).send({ error: "Post ID, User ID, and comment are required" });
      }
  
      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ error: "Invalid Post ID or User ID" });
      }
  
      const newComment = new Comment({
        comment,
        userId: mongoose.Types.ObjectId(userId),  // Correct usage without 'new'
        postId: mongoose.Types.ObjectId(postId)   // Correct usage without 'new'
      });
  
      const savedComment = await newComment.save();
  
      res.status(200).json({ message: 'Comment saved', comment: savedComment });
    } catch (error) {
      console.error('Error saving comment:', error);
      res.status(500).send({ error: "An error occurred" });
    }
  };