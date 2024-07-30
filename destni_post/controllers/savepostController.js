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
    const postId = req.params.postId;
    const userId = req.session.userId;

    if (!userId || !postId) {
      return res.status(statuscode.CLIENT_ERROR.BAD_REQUEST.code).json({ error: statusmessage.CLIENT_ERROR.BAD_REQUEST });
    }

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(statuscode.CLIENT_ERROR.NOT_FOUND.code).json({ error: statusmessage.CLIENT_ERROR.NOT_FOUND });
    }

    const existingSave = await SavePost.findOne({ postId: postId, userId: userId });
    if (!existingSave) {
      // Save the post
      const savepost = new SavePost({ userId, postId });
      const postsaved = await savepost.save();
      console.log(postsaved);
      res.status(statuscode.SUCCESS.OK.code).json({ message: statusmessage.SUCCESS.OK });
    } else {
      // Unsaved the post
      const deletpostfromsave = await SavePost.findOneAndDelete({ postId: postId, userId: userId });
      console.log(deletpostfromsave);
      console.log("data deleted successfully");
      res.status(statuscode.SUCCESS.OK.code).json({ message: statusmessage.SUCCESS.OK });
    }
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(statuscode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: statusmessage.SERVER_ERROR.INTERNAL_SERVER_ERROR });
  }
};
