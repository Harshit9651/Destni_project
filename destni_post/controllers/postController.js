
const { postSchema } = require('../validation/postSchemavalidation');
const createError = require('http-errors');
const statuscode = require("../helper/statuscode");
const statusmessage = require('../helper/statusmessage');
const Like = require('../models/likeModel')
const post = require('../models/postModel')
const notification = require("../models/notificationModel")
const mongoose = require('mongoose')
const Comment = require("../models/commentModel")
const cloudinary = require('cloudinary').v2;
const uploadToCloudinary = async (file) => {
  if (file && file.path) {
    //const result = await cloudinary.uploader.upload(file.buffer.toString('base64'));
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } else {
    throw new Error('File buffer is undefined or null');
  }
};

exports.renderPostPage = async(req,res)=>{
    res.render("post.ejs")
}


exports.postAction = async (req, res, next) => {
  const imageFile = req.files['Image'][0];
  const IMAGE = await uploadToCloudinary(imageFile);
  console.log(IMAGE);
  if(!IMAGE){
    res.send(500).send("errorore")
  }
  const { caption, title, mediaType, postStatus, audienceVisibility, tags } = req.body;
  console.log( caption, title, mediaType, postStatus, audienceVisibility, tags)
  console.log("Session UserID:",req.session.userId);
  try {
  
    // const { error } = postSchema.validate(req.body);
    // if (error) {
    //   throw createError(statuscode.CLIENT_ERROR.BAD_REQUEST.code, error.details[0].message);
    // }
    const newPost = new post({
      caption,
      postImageUrl:IMAGE,
     userId:req.session.userId,
      title,
      mediaType,
      postStatus,
      audienceVisibility,
 
    });

    const savedPost = await newPost.save();
    res.status(statuscode.SUCCESS.CREATED.code).json(savedPost);
    console.log(savedPost)
  } catch (error) {
    console.error('Error creating post:', error);
    next(createError(statuscode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code, statusmessage.SERVER_ERROR.INTERNAL_SERVER_ERROR));
  }
};


exports.renderpostdetailpage= async(req,res)=>{
  res.render("postdetail.ejs")
}
 
exports.getPostWithDetails = async (req, res) => {
  try {
    const { postId } = req.body; // Assuming postId is sent in the request body

    // Fetch post with likes and comments populated
    const postdata = await post.findOne({ postId })
      .populate('likes')
      .populate('comments')
      .exec();

    if (!postdata) {
      return res.status(404).send({ error: 'Post not found' });
    }

    console.log(postdata)
    res.status(200).json({ postdata });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send({ error: 'An error occurred' });
  }
};
exports.listAllposts = async(req,res)=>{
  try{
    const postdata = await  post.find({}).populate('likes')    // Populate the likes
    .populate('comments').exec();
    
res.send(postdata);
  }catch(error){
    res.status(500).send({ error: 'An error occurred' });
  }
}
exports.userpostes = async(req,res)=>{
const userId = req.session.userId;
const posts =  await post.findById(userId);
res.send(posts);
}