// Add Passport-related auth routes here.

// ----------------------------------------------
// Ver
// ----------------------------------------------

var express = require('express');
var router = express.Router();
var models = require('../models/models');

function randomCode() {
  var min = 1000;
  var max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(passport) {

  router.get('/login', function(req, res) {
    console.log(req.user);
    res.render('login');
  });

  // POST Login page
  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/profileInfo');
  });


  // GET registration page
  router.get('/register', function(req, res) {
    res.render('signup');
  });

  // POST registration page
  var validateReq = function(userData) {
    return (userData.password === userData.passwordRepeat);
  };

  router.post('/register', function(req, res) {
    // validation step
    if (!validateReq(req.body)) {
      return res.render('signup', {
        error: "Passwords don't match."
      });
    }
      var u = new models.User({
  	  firstName: req.body.firstName,
  	  lastName: req.body.lastName,
  	  email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      verification: randomCode()
      });

    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }
      res.redirect('/login')
    })
  });


  // GET Login page


router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profileInfo');
  });

router.get('/logout', function(req, res) {
   req.logout();
   res.redirect('/login');
  });
  return router;
};
