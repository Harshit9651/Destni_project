const Post = require("../models/postModel");
const Report = require("../models/reportModel");
const statuscode = require("../helper/statuscode");
const statusmessage = require('../helper/statusmessage');

exports.renderreportpage = async (req, res) => {
  try {
    res.render("report.ejs");
  } catch (error) {
    console.error('Error rendering report page:', error);
    res.status(statuscode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ error: statusmessage.SERVER_ERROR.INTERNAL_SERVER_ERROR });
  }
};

exports.report = async (req, res) => {
  try {
    const { postId, reason,userId} = req.body;
    console.log(postId, reason,userId);
    //we catch user id from session id
    

    const post = await Post.findOne({ postId: postId });
    if (!post) {
      return res.status(statuscode.CLIENT_ERROR.NOT_FOUND.code).json({ message: statusmessage.CLIENT_ERROR.NOT_FOUND });
    }

    const newReport = new Report({
        Reprotedby: userId,
      post: postId,
      reason
    });

    await newReport.save();
    res.status(statuscode.SUCCESS.CREATED.code).json({ message: statusmessage.SUCCESS.CREATED });
  } catch (error) {
    console.error('Error reporting post:', error);
    res.status(statuscode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).json({ message: statusmessage.SERVER_ERROR.INTERNAL_SERVER_ERROR });
  }
};
