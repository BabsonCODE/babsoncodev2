var express = require('express');
var router = express.Router();
var User = require('../models/models').User;
var _ = require('underscore')
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index')
});
router.get('/do_index', function(req, res, next){
	res.render('do')
});
router.get('/community_index', function(req, res, next){
	res.render('community')
})
router.get('/projects_index', function(req, res, next){
	res.render('projects_index')
})
router.use(function(req, res, next){
    	if(!req.user){
    		res.redirect('/login');
    	} else {
  			return next();
  		}
  })
router.get('/profileInfo', function(req,res,next){
	console.log(req.user.id)
	User.findById(req.user.id).lean().exec(function(err, user){
		if (!user.bio){
			res.render('profileInfo', {
				
			})
			return
		} else {
			res.render('profile', {
				imageUrl: user.imageUrl,
				name: user.name,
				motto: user.motto,
				bio: user.bio,
				skills: user.skills,
				notes: user.notes,
				email: user.email,
				phone: user.phoneNumber,
				website: user.website,

			})
			return
		}
	})
})

router.post('/profileInfo', function(req, res, next){
	var update = {
		motto: req.body.motto.toString(),
		bio: req.body.bio.toString(),
		skills: req.body.skills.toString().split(",")
	}

	User.findByIdAndUpdate(req.user.id, update, function(error, user){
		User.findById(req.user.id, function(e, u){
			res.json({'message':'Upload Successful', 'user': u});
		})
	})
})

router.put('/profileInfo', function(req, res, next){
	var update = {
		motto: req.body.motto,
		bio: req.body.bio, 
		skills: req.body.skills
	}

	User.findByIdAndUpdate(req.user.id, update, function(error, user){
		error ? res.json({"success": false, "message": error}) : null
		User.findById(req.user.id, function(err, user){
			error ? res.json({"success": false, "message" : err}) : res.json({"success": true, "user": user})
		})
	})
})



module.exports = router;
