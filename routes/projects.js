var express = require('express');
var router = express.Router();
var Project = require('../models/models').Project;
var User = require('../models/models').User;


router.get('/projects', function(req, res, next){
	Project.find({}).populate('projectCreator members.member').exec(function(err, projects){
		User.findById(req.user.id).lean().exec(function(err, user){
		console.log(err);
		console.log(projects);
			res.render('projectsNode', {
				imageUrl: user.imageUrl,
				projects: projects
			})
		})
	})
})

router.post('/projects', function(req, res, next){
	var p = new Project({
		projectCreator: req.user.id,
		name: req.body.nameInput,
		description: req.body.descriptionInput,
		imageUrl: req.body.imageUrl
	})

	p.save(function(error, project){
		if (error){
			console.log(error)
		}
		else {
			console.log(project);
			res.redirect('/projects');
		}
	})

})

router.get('/projects/:id', function(req, res, next){
	Project.findById(req.params.id).lean()
})
// // router.get('/projects/:pid', function(req, res, next){

// // 	Projects.findById(req.params.pid, function(err, project){
// // 		if (!req.user){
// // 			res.render('singleProject', {})
// // 			return
// // 		}
// // 		else {
// // 			res.render('singleProjectUser', {})
// // 			return
// // 		}
// // 	})
// // })

// // /* Wall */
// // router.use(function(req, res, next){
// //     	if(!req.user){
// //     		res.redirect('/login');
// //     	} else {
// //   			return next();
// //   		}
// //  })

// // router.post('/projects', function(req, res, next){
// // 	var project = new Projects({
// // 		name: req.body.name,
// // 		description: req.body.description,
// // 		projectCreators: [req.user.id],
// // 		members: [req.user.id]
// // 	})

// // 	project.save(fucntion(err, project){
// // 		if (err){
// // 			res.render('/projects', {
// // 				error: err
// // 			})
// // 		} else {
// // 			res.redirect('/projects/' + project._id);
// // 		}
// // 	})
// // })

// // router.post('/projects', function(req, res, next){
// // 	var p = new Projects({

// // 	})
	
// // })

module.exports = router;
