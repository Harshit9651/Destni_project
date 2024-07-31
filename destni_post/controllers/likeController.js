const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res, next) => {
  const postId = req.params.postId;
  if (!postId) {
    return res.status(400).send('Post ID is required');
  }

  const userId = req.session.userId;
  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  try {
    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send('Post not found');
      }

      if (post.likesCount > 0) {
        post.likesCount -= 1;
      const postdata =  await post.save();
      console.log(postdata)
      }

      return res.status(200).json({ success: true, likesCount: post.likesCount });
    } else {
      const newLike = new Like({ postId, userId });
      await newLike.save();

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send('Post not found');
      }

      post.likesCount += 1;
    const postdata =  await post.save();
console.log(postdata)
      return res.status(200).json({ success: true, likesCount: post.likesCount });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};
