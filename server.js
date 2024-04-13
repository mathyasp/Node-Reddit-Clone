const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('home');
});

// CASES RESOURCE

// NEW
app.get('/cases/new', (req, res) => {
  res.render('cases-new', {});
})

app.listen(3000);