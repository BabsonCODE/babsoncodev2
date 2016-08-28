// ----------------------------------------------
// USED TO SEED DATABASE WITH MEAGER DATA
// ----------------------------------------------

var Project = require('./models/models').Project
var _ = require('underscore');
// ----------------------------------------------
// Import dependencies
// ----------------------------------------------
var mongoose = require('mongoose');

var connect = process.env.MONGODB_URI
mongoose.connect(connect);

// ----------------------------------------------
// Log successful connection in console
// ----------------------------------------------
var db = mongoose.connection;
db.once('open', function callback () {
  console.log("DB Connected!");
});

var projects = [{
	projectCreator: '57be2207ca7b3ab028cf07a6',
	name: 'Project Carbon Zero',
	description: 'Project Carbon Zero aims to lower carbon emissions by rewarding sustainability driven ventures from BOW schools',
	imageUrl: 'https://aos.iacpublishinglabs.com/question/aq/700px-394px/pollution-bad_fbd596fd1a506e77.jpg?domain=cx.aos.ask.com',
	private: false
},
{
	projectCreator: '57be2207ca7b3ab028cf07a6',
	name: 'Hackathons',
	description: 'Join the CODE hackathon team and travel around the world building cool stuff and eating a lot of food',
	imageUrl: 'https://cdn01.vulcanpost.com/wp-uploads/2016/07/Hackaton-feature.jpg',
	private: false
},
{
	projectCreator: '57be2207ca7b3ab028cf07a6',
	name: 'Blank Center Partnership',
	description: 'Working with the Blank Center for Enterpreneurship, CODE provides technology consulting to budding ventures in the accelerator and SVP',
	imageUrl: 'https://blackboard.babson.edu/branding/themes/as_do_not_use/images/bg_blank_center-1200x800.jpg',
	private: false
},
{
	projectCreator: '57be2207ca7b3ab028cf07a6',
	name: 'CodePLEX',
	description: "CODE's premier living area, CodePLEX is our hacker and smart home housing 21 members of CODE",
	imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Van_Winkle_Hall,_Babson_College_-_IMG_0441.JPG',
	private: false
},
{
	projectCreator: '57be2207ca7b3ab028cf07a6',
	name: 'Waste--',
	description: 'Partnering with the Sustainability Department, CODE is working to lower food waste making the Babson Community more aware of waste data',
	imageUrl: 'http://www.konbini.com/us/files/2015/05/FoodWastePic.jpg',
	private: false
},
{
	projectCreator: '57be2207ca7b3ab028cf07a6',
	name: 'CodeEDU',
	description: 'Learn How to CODE from the best programmers in the CODE organization. We currently teach web design.',
	imageUrl: 'http://edu.stemjobs.com/wp-content/uploads/2015/05/coding.jpg',
	private: false
}]

_.each(projects, function(elt){
	var p = new Project({
		projectCreator: elt.projectCreator,
		name: elt.name,
		description: elt.description,
		imageUrl: elt.imageUrl,
		private: elt.private
	})

	p.save(function(err, project){
		err ? console.log(err) : console.log('success');
	})
})
