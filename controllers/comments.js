const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = (app) => {
  // CREATE Comment
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      const comment = new Comment(req.body);
      comment.author = req.user._id;
      await comment.save();
      const post = await Post.findById(req.params.postId);
      post.comments.unshift(comment);
      await post.save();
      res.redirect(`/posts/${req.params.postId}`);
    } catch (error) {
      console.log(error);
    }
  });
};