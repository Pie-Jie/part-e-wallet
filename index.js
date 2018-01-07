var express = require('express');
var path = require('path');
const PORT = process.env.PORT || 3000

express()
    .use(express.static('./public'))
    .set('views', './views')
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/login', (req, res) => res.render('pages/login'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));