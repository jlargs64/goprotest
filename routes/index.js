var express = require('express');
var router = express.Router();
var pg = require('../utils/db');
var bcrypt = require('bcrypt');
var saltRounds = 10;
const { body, validationResult } = require('express-validator');

/* GET Landing page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'goPROTEST' });
});

router.get('/login', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (email && password) {
    pg('users')
      .where({
        email: email,
      })
      .select('id', 'password')
      .then((rows) => {
        if (rows.length > 0) {
          bcrypt.compare(password, rows[0].password, function (err, result) {
            if (result) {
              req.login(rows[0], function (err2) {
                if (err2) {
                  return next(err2);
                }
                req.app.locals.userId = rows[0].id;
                return res.redirect(`/users/${rows[0].id}`);
              });
            } else {
              res.redirect('/login');
            }
          });
        } else {
          res.redirect('/login');
        }
      });
  } else {
    res.redirect('/login');
  }
});

router.get('/signup', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signup');
  }
});

router.post(
  '/signup',
  [body('email').isEmail(), body('password').isLength({ min: 5 })],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.app.locals.signerr = errors.array()[0];
      return res.redirect('/signup');
      // return res.status(422).json({ errors: errors.array() });
    }

    var fullName = req.body.fullName;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Check password and password2 if they match
    if (password === password2) {
      // See if user exists already
      pg.from('users')
        .where({ email: email })
        .select('*')
        .then((rows) => {
          if (rows.length > 0) {
            // Send back to login with helpful error
            res.redirect('/login');
          } else {
            // Create a password hash
            bcrypt.genSalt(saltRounds, function (err, salt) {
              bcrypt.hash(password, salt, function (err, hash) {
                // Save user to DB
                pg('users')
                  .returning('id')
                  .insert({ full_name: fullName, email: email, password: hash })
                  .then(function (id) {
                    // Redirect to profile
                    req.app.locals.userId = rows[0].id;
                    res.redirect(`/users/${id}`);
                  });
              });
            });
          }
        });
    } else {
      // Redirect back to sign up with error
      res.redirect('/login');
    }
  }
);

router.get('/logout', function (req, res, next) {
  req.logout();
  delete req.app.locals.userId;
  res.redirect('/');
});

module.exports = router;
