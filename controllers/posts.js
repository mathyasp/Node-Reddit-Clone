const Post = require('../models/post');

module.exports = (app) => {
  // INDEX
  app.get('/', async (req, res) => {
    try {
      const currentUser = req.user;
      const posts = await Post.find({}).lean();
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
        const post = new Post(req.body);
        await post.save();
        res.redirect('/');
      } else {
        return res.status(401);
      }
		} catch (error) {
			console.error('Error saving post:', error);
			res.status(500).send('Error saving post');
		}
	});

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments');
      res.render('posts-show', { post });
    } catch (error) {
      console.error('Error getting post:', error);
    }
  });

  // SUBREDDIT
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      res.render('posts-index', { posts });
    } catch (error) {
      console.log(error);
    }
  });
};

