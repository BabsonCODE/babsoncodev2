// var express = require('express');
// var router = express.Router();
// var Project = require('../models/models').Project;



// router.get('/projects', function(req, res, next){
// 	Project.find({}).lean().exec(function(err, projects){
// 		console.log(err);
// 		console.log(projects);
// 		res.json({"success": true, "projects": projects})
// 	})
// })

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

// module.exports = router;
