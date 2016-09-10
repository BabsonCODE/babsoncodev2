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

 
  // GET Login page


router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profileInfo');
  });

router.get('/logout', function(req, res) {
   req.logout();
   res.redirect('/');
  });
  return router;
};
