const SavePost = require("../models/savepostModel");
const Post = require("../models/postModel");
const statuscode = require("../helper/statuscode");
const statusmessage = require('../helper/statusmessage');


exports.rendersavepostpage = async (req, res) => {
  try {
    res.render("savepost.ejs");
  } catch (error) {
    console.error('Error rendering save post page:', error);
    res.status(statuscode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: statusmessage.SERVER_ERROR.INTERNAL_SERVER_ERROR });
  }
};

exports.savePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    console.log(userId, postId)

    if (!userId || !postId) {
      return res.status(statuscode.CLIENT_ERROR.BAD_REQUEST.code).json({ error: statusmessage.CLIENT_ERROR.BAD_REQUEST });
    }

    const post = await Post.findOne({postId:postId});
    if (!post) {
      return res.status(statuscode.CLIENT_ERROR.NOT_FOUND.code).json({ error: statusmessage.CLIENT_ERROR.NOT_FOUND });
    }

    const existingSave = await SavePost.findOne({postId:postId});
    if (!existingSave) {
      const savepost = new SavePost({ userId, postId });
      const postsaved = await savepost.save();
      console.log(postsaved);
    } else {
      return res.status(statuscode.CLIENT_ERROR.CONFLICT.code).json({ error: statusmessage.CLIENT_ERROR.CONFLICT });
   //yha hum userId ki jgh session.userId  dalenge ok
    }

    res.status(statuscode.SUCCESS.OK.code).json({ message: statusmessage.SUCCESS.OK });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(statuscode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: statusmessage.SERVER_ERROR.INTERNAL_SERVER_ERROR });
  }
};