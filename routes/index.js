var express = require('express');
var router = express.Router();

/* GET Landing page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'goPROTEST'});
});

router.get('/login', function(req,res,next){
  res.render('login');
});

router.post('/login', function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  console.log(req.body);
});

router.get('/signup', function(req,res,next){
  res.render('signup');
});

router.post('/signup', function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  
  // Check password and password2 if they match

  console.log(req.body);
});

module.exports = router;
