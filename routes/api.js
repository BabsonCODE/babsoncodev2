var express = require('express');
var router = express.Router();
var Project = require('../models/models').Project;



router.get('/projects', function(req, res, next){
	Project.find({}).lean().limit(10).exec(function(err, projects){
		console.log(err);
		console.log(projects);
		res.json({"success": true, "projects": projects})
	})
})

module.exports = router;