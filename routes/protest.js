var express = require('express');
var router = express.Router();
var pg = require('../utils/db');

/* GET users listing. */
router.get('/', function (req, res, next) {
  pg('protests')
    .select('*')
    .orderBy('start_time', 'asc')
    .then(function (rows) {
      res.render('all-protests', { protests: rows });
    });
});

router.get('/create', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('create-protest');
  } else {
    res.redirect('/login');
  }
});

//Check post name
router.post('/create', function (req, res, next) {
  var protestName = req.body.protestName;
  var bio = req.body.bio;
  var startDate = req.body.startDate;
  var startTime = req.body.startTime;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zipCode = req.body.zipCode;

  var protestId = pg('protests').returning('id').insert({
    name: protestName,
    bio: bio,
    start_time: startTime,
    address: address,
    city: city,
    state: state,
    zip_code: zipCode,
  });

  pg('user_protest_signup').insert({
    user_id: req.app.locals.userId,
    protest_id: protestId,
    role: 'Owner',
  });
});

module.exports = router;
