var express = require('express');
var router = express.Router();
var Project = require('../models/models').Project;
var User = require('../models/models').User;
var Update = require('../models/models').Update;

router.post('/posts', function(req, res, next){
	var update = new Update({
		projectParent: req.body.projectId,
		content: req.body.content,
		user: req.user.id,
		createdAt: new Date()
	});

	update.save(function(err, update){
		err ? console.log(err) : console.log(update);
		res.json({'success' : true, 'update' : update});
	})
})

router.get('/posts/:id', function(req, res, next){
	Update.find({projectParent: req.params.id}).sort({createdAt: -1}).populate('user').lean().exec(function(err, updates){
			console.log(updates);
			res.json({'success': true, 'posts': updates})
	})
})

module.exports = router;