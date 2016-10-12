var express = require('express');
var router = express.Router();
var User = require('../models/models').User;
var _ = require('underscore')


router.get('/users/:id', function(req, res, next){

	// if (req.params.id === req.user.id){
	// 	res.redirect('/profileInfo');
	// 	return;
	// } else {
		User.findById(req.params.id).lean().exec(function(err, user){
			User.findById(req.user.id).lean().exec(function(err, me){


				err ? console.log(err) : console.log(user);
				res.render('user', {
					user: user,
					imageUrl: me.imageUrl
				})
			})
		})


	// }


})

router.get('/secureFacebookLink/:id', function(req, res, next){
		User.findById(req.params.id).lean().exec(function(err, user){

			res.redirect('https://www.facebook.com/'+ user.facebookId);
		})
})








module.exports = router;