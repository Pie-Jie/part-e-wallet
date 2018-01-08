var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/db');

mongoose.connect(configDB.url);
console.log(`database collections ${mongoose.connection.collections}`);

require('./config/passport')(passport);
     
 app.use(express.static('./public'));
 app.use(cookieParser());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.set('view engine', 'ejs');
 app.use(session({ 
     secret: 'hellofriendfsociety',
     resave: true,
     saveUninitialized: true
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(flash());

require('./config/routes')(app, passport);
app.listen(port);
console.log(`Server listening on ${port}`);
   