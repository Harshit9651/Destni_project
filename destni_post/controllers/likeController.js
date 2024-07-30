const Like = require("../models/likeModel");
const Post = require("../models/postModel")
exports.likePost = async (req, res, next) => {
    const postId = req.params.postId; 
    console.log(postId)
    if (!postId) {
      return res.status(400).send('Sorry, ID is not found');
    }
    console.log( 'bhn ki chut postId is :',postId)
  
    const userId = req.session.userId;
    console.log('bhn ki bhosdi userid is :',userId)
  
    try {
      const existingLike = await Like.findOne({ postId, userId });
  
      if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });
        const post = await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } }, { new: true });
        return res.status(200).json({ success: true, likes: post.likes });
      } else {
        const newLike = new Like({ postId, userId });
        await newLike.save();
        const post = await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
        return res.status(200).json({ success: true, likes: post.likes });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  };