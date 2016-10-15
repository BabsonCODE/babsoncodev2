var express = require('express');
var router = express.Router();
var Project = require('../models/models').Project;
var User = require('../models/models').User;
var ProjectUser = require('../models/models').ProjectUser;
var Posts = require('../models/models').Update;

router.get('/projectsInternal', function(req, res, next){
	Project.find({}).sort({createdAt: -1}).populate('projectCreator').exec(function(err, projects){
		User.findById(req.user.id).lean().exec(function(err, user){
		console.log(err);
		console.log(projects[0]);
		console.log(projects[0].members)
			res.render('projectsInternal', {
				imageUrl: user.imageUrl,
				projects: projects,
				length: projects.length
			})
		})
	})
})

router.post('/projectsInternal', function(req, res, next){
	var p = new Project({
		projectCreator: req.user.id,
		name: req.body.name,
		description: req.body.description,
		imageUrl: req.body.image,
		createdAt: new Date()
	})

	p.save(function(error, project){
		if (error){
			console.log(error)
		}
		else {
			console.log(project);
			var pU = new ProjectUser({
				user: req.user.id,
				project: project._id,
				contribution: "Project Creator",
				createdAt: new Date()
			})

			pU.save(function(err, projectUser){
			err ? console.log(err) : null
			res.redirect('/projectsInternal/' + project._id);

			})
		}
	})

})

router.get('/projectsInternal/:id', function(req, res, next){
	User.findById(req.user.id).lean().exec(function(error, user){
		Project.findById(req.params.id).populate('projectCreator').lean().exec(function(err, project){
				ProjectUser.find({project: project._id}).populate('user').lean().exec(function(err, projectUser){
						err ? console.log(err) : null
						console.log(project);
						console.log(projectUser);

						var check = false;
						var userContribution;
						for (var x = 0; x < projectUser.length; x++){
							if(projectUser[x].user._id + "" === req.user.id){
								userContribution = projectUser[x].contribution;
								console.log('USER CONTRIBUTION',userContribution);
								check = true;
								break;
							}
						}

						if (project.projectCreator._id + "" === req.user.id){
							res.render('singleProjectOwner', {
								length: projectUser.length,
								imageUrl: user.imageUrl,
								project: project,
								projectUser: projectUser,
								contribution: userContribution
							})

						} else if (!check){
							res.render('singleProject', {
								length: projectUser.length,
								imageUrl: user.imageUrl,
								project: project,
								projectUser: projectUser,
								contribution: userContribution
							});
							return;
						} else {
							res.render('singleProjectMember', {
								length: projectUser.length,
								imageUrl: user.imageUrl,
								project: project,
								projectUser: projectUser,
								contribution: userContribution
							})
						}
					});
			});
		});
});

router.post('/projectsInternal/:id', function(req, res, next){
	console.log('here');
	Project.findById(req.params.id).lean().exec(function(error, project){
			ProjectUser.find({project: req.params.id}).lean().exec(function(err, projectUser){

				err ? console.log(err) : null

				var created = false;

				for (var i = 0; i < projectUser.length; i++){
					if(projectUser[0].user + "" === req.user.id){
						created = true;
						break;
					}
				}

				if (!created){
					var pU = new ProjectUser({
					user: req.user.id,
					project: req.params.id,
					contribution: req.body.contribution,
					created: new Date()
					});

					pU.save(function(error, ProjectUser){
						error ? console.log(error) : res.redirect('/projectsInternal/' + req.params.id)
					})

					return;
				} else {
					if (project.projectCreator + "" === req.user.id){

					var updateProject = {
						name: req.body.name,
						description: req.body.description,
						imageUrl: req.body.image
					}

					Project.findByIdAndUpdate(req.params.id, updateProject).exec(function(error, project){

						var updateProjectUser = {
							contribution: req.body.contribution
						}

						ProjectUser.update({user: req.user.id, project: req.params.id}, updateProjectUser).exec(function(error, updateProjectUser){

							error ? console.log(err) : res.redirect('/projectsInternal/' + req.params.id);

						})

					})

					} else {

					var update = {
						contribution: req.body.contribution
					}

					ProjectUser.update({project: req.params.id, user: req.user.id}, update).exec(function(err, update){

							err ? console.log(err) : res.redirect('/projectsInternal/' + req.params.id);

							})
					}
				}
			})
		})
})

router.get('/leave/:id', function(req, res, next){

	ProjectUser.find({project: req.params.id, user: req.user.id}).remove().exec(function(err){

			err ? console.log(err) : null

			res.redirect('/projectsInternal/' + req.params.id);
	})
})

router.get('/delete/:id', function(req,res, next){

	Project.findById(req.params.id).exec(function(error, project){

		if(project.projectCreator + "" !== req.user.id){
			res.redirect('https://tuunes.co/wp-content/uploads/Fuck-off-Sir-by-Fuck-off-Factory-SNP51409420-600x600.jpg');
		} else {
			ProjectUser.find({project: req.params.id}).remove().exec(function(error, projectUser){
		

				Posts.find({projectParent: req.params.id}).remove().exec(function(error, Posts) {



					Project.findById(req.params.id).remove().exec(function(error, Project){

						res.redirect('/projectsInternal');

					})
				})
			})
		}
	})

})

// // /* Wall */
// // router.use(function(req, res, next){
// //     	if(!req.user){
// //     		res.redirect('/login');
// //     	} else {
// //   			return next();
// //   		}
// //  })



module.exports = router;
