const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // SIGN UP FORM
  app.get('/sign-up', (req, res) => res.render('sign-up'));

  // SIGN UP POST
  app.post('/sign-up', async (req, res) => {
    // Create User
    try {
      const user = new User(req.body);
      await user.save();

      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

      res.redirect('/');
    } catch (error) {
      console.log(error.message);
    }
  });

   // LOGOUT
   app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    return res.redirect('/');
  });

  // LOGIN FORM
  app.get('/login', (req, res) => res.render('login'));

  // LOGIN
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username }, 'username password');
      if (!user) {
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: 'Wrong Username or password' });
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: '60 days',
        });
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        return res.redirect('/');
      });
    } catch (error) {
      console.log(err);
    }
  });
};