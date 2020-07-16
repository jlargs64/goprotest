var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pg = require('./utils/db');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  pg('users')
    .where({ id })
    .first()
    .then((user) => {
      done(null, user);
    });
});

module.exports = passport;
