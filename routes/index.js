var express = require('express');
var router = express.Router();

/* GET Landing page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'goPROTEST'});
});

router.get('/login', function(req,res,next){
  res.render('login');
});

router.get('/signup', function(req,res,next){
  res.render('signup');
});

module.exports = router;
