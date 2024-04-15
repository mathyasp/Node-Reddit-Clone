const cookieParser = require('cookie-parser');
const express = require('express');
const { engine } = require('express-handlebars');
require('./data/reddit-db');
require('dotenv').config();

const app = express();

app.use(cookieParser());
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.listen(3000);

module.exports = app;