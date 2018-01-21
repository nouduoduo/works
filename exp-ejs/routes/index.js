var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express with <em>Ejs</em>',user:{name:"Bill Gates"} });
});
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'contact' });
});
module.exports = router;
