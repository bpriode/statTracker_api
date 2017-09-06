const express = require('express');
const path = require('path');
const routes = require('./routes/index.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport          = require('passport');
const BasicStrategy     = require('passport-http').BasicStrategy;

const app = express();

const users = {
  'test': 'test'
};

passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));
app.get('/api/auth',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({"hello": req.user})
    }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(morgan('dev'));

app.use(routes);

app.listen(3000, function() {
  console.log('App is running on localhost:3000');
})
