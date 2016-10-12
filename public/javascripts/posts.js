var clearBoard = function(){

}


var render = function(){

}

var getPosts = function(projectId){
	$.get("/posts/" + projectId,
		function(data, status){
			console.log(data);
		})
}

var mountBoard = function(){

}



var setPosts = function(postContent, projectId){
	$.post("/posts", 
		{
			content: postContent,
			projectId: projectId
		}, function(data, status){
			console.log(data, status)
		})
}