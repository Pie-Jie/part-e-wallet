var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var pass = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var configDB = require('./config/db');
mongoose.connect(configDB.url);

require('./config/pass')(pass);
    app 
        .use(express.static('./public'))
        .use(cookieParser())
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }))
        .set('view engine', 'ejs')
        .use(cookieSession({ secret: 'hellofriendfsociety' }))
        .use(pass.initialize())
        .use(pass.session())
        .use(flash());

require('./config/routes')(app, pass);
app.listen(PORT);
console.log(`Server listening on ${PORT}`);
   