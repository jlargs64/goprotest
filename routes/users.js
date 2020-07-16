var express = require('express');
var router = express.Router();
var pg = require('../utils/db');

/* GET a user by id. */
router.get('/:id', function (req, res, next) {
  if (req.isAuthenticated()) {
    var id = req.params.id;
    pg('users')
      .where({ id: id })
      .select('full_name', 'email')
      .limit(1)
      .then(function (users) {
        if (users.length === 1) {
          const user = users[0];
          res.render('profile.pug', { user: user, id: id });
        } else {
          res.redirect('/');
        }
      });
  } else {
    res.redirect('/login');
  }
});

/* UPDATE a user by id. */
router.get('/:id/edit', function (req, res, next) {
  if (req.isAuthenticated() && req.app.locals.userId === id) {
    var id = req.params.id;
    pg('users')
      .where({ id: id })
      .select('full_name', 'email')
      .limit(1)
      .then(function (users) {
        if (users.length === 1) {
          const user = users[0];
          res.render('update-profile.pug', { user: user, id: id });
        } else {
          res.redirect('/');
        }
      });
  } else {
    res.redirect('/login');
  }
});

/* UPDATE a user by id. */
router.post('/:id/edit', function (req, res, next) {
  if (res.isAuthenticated()) {
    var id = req.params.id;
    var email = req.body.email;
    var fullName = req.body.fullName;
    // Check if logged in user owns that
    if (req.app.locals.userId === id) {
      pg('users')
        .where({ id: id })
        .update({ email: email, full_name: fullName })
        .then(function () {
          res.redirect(`../${id}`);
        });
    }
  }
});

module.exports = router;
