var express = require('express');
var router = express.Router();
var pg = require('../utils/db');

/* GET protests listing. */
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

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  pg('protests')
    .where({ id: id })
    .select('*')
    .first()
    .then(function (row) {
      console.log(row);
      res.render('protest', { protest: row });
    });
});

//Check post name
router.post('/create', function (req, res, next) {
  var protestName = req.body.name;
  var bio = req.body.bio;
  var startDate = req.body.startDate;
  var startTime = req.body.startTime;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zipCode = req.body.zipCode;

  pg('protests')
    .returning('id')
    .insert({
      name: protestName,
      bio: bio,
      start_time: `${startDate} ${startTime} EST`,
      address: address,
      city: city,
      state: state,
      zip_code: zipCode,
    })
    .then((id) => {
      pg('user_protest_signup')
        .insert({
          user_id: req.app.locals.userId,
          protest_id: id[0],
          role: 'Owner',
        })
        .then(() => {
          res.redirect(`../protests/${id[0]}`);
        });
    });
});

module.exports = router;
