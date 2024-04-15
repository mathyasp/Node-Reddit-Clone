const express = require('express');
const { engine } = require('express-handlebars');
require('./data/reddit-db');

const app = express();

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/posts')(app);

app.listen(3000);