var mongoose = require('mongoose');

var findOrCreate = require('mongoose-findorcreate');

var userSchema = mongoose.Schema({
	facebookId: String,
	name: String,
	email: String,
	phoneNumber:String,
	website: String,
	bio: String,
	imageUrl: String,
	motto: String,
	skills: Array,
	projects: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	}],
	events: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Events'
	}],
	notes: String,
	count: Number
});

var projectSchema = mongoose.Schema({
	projectCreator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}],
	name: String,
	description: String,
	imageUrl: String,
	private: Boolean
});

var updateSchema = mongoose.Schema({
	projectParent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project"
	},
	title: String,
	desc: String,
	poster:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

userSchema.plugin(findOrCreate);

module.exports = {
	User: mongoose.model('User', userSchema),
	Project: mongoose.model('Project', projectSchema),
	Update: mongoose.model('Update', updateSchema)
}
