var express = require('express');
var router = express.Router();
var User = require('../models/models').User;
var ProjectUser = require('../models/models').ProjectUser;
var _ = require('underscore')


router.get('/users/:id', function(req, res, next){

	if (req.params.id === req.user.id){
		res.redirect('/profileInfo');
		return;
	} else {
		User.findById(req.params.id).lean().exec(function(err, user){
			User.findById(req.user.id).lean().exec(function(err, me){
				ProjectUser.find({user: req.params.id}).populate('project').lean().exec(function(err, projectUser){
						err ? console.log(err) : console.log(user);

						console.log(projectUser);

						res.render('user', {
							user: user,
							imageUrl: me.imageUrl,
							projectUser: projectUser
						})
					})
			})
		})


	}


})

router.get('/secureFacebookLink/:id', function(req, res, next){
		User.findById(req.params.id).lean().exec(function(err, user){

			res.redirect('https://www.facebook.com/'+ user.facebookId);
		})
})








module.exports = router;