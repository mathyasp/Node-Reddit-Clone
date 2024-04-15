const Post = require('../models/post');

module.exports = (app) => {
  // INDEX
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
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
			const post = new Post(req.body);
			await post.save();
			res.redirect('/');
		} catch (error) {
			console.error('Error saving post:', error);
			res.status(500).send('Error saving post');
		}
	});

  // SHOW
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      res.render('posts-show', { post });
    } catch (error) {
      console.error('Error getting post:', error);
    }
  });
};