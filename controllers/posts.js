const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {
  // INDEX
  app.get('/', async (req, res) => {
    try {
      const currentUser = req.user;
      const posts = await Post.find({}).lean().populate('author');
      res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
  });

  // CREATE
  app.post('/posts/new', async (req, res) => {
		try {
      if (req.user) {
        const userId = req.user._id;
        const post = new Post(req.body);
        post.author = userId;
        await post.save();
        const user = await User.findById(userId);
        user.posts.unshift(post);
        await user.save();
        return res.redirect(`/posts/${post._id}`);
      } else {
        return res.status(401);
      }
		} catch (error) {
			console.log(error.message);
		}
	});

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    const currentUser = req.user;
    try {
      const post = await Post.findById(req.params.id).populate('comments').lean()
      res.render('posts-show', { post, currentUser });
    } catch (error) {
      console.log(error.message);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    const { user } = req;
    const { subreddit } = req.params;
    try {
      const posts = await Post.find({ subreddit }).lean()
      res.render('posts-index', { posts, user });
    } catch (error) {
      console.log(error.message);
    }
  });
};

