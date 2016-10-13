var clearBoard = function(){
	$('#postingBoard').html('');
}


var render = function(posts){
	console.log(posts);
	console.log("render being called");

	posts.forEach(function(post, index){
		var wrapper = $('<div></div>');
        var member = $('<div class = "member"></div>');
        var image = $('<div class = "memberImage" style = "background-image:url(' + post.user.imageUrl + ')"></div>');
        var info = $('<div class= "memberInfo"></div>');
        var name = $('<h3><a href="/users/' +  post.user._id + '">' + post.user.name + '</a></h3>');
        var content = $('<p><span class="bold">' + post.content + '</span></p>')
        var time = $('<p>' + post.createdAt + '</p>');

        wrapper.append(member);
        member.append(image);
        member.append(info);
        info.append(name);
        info.append(content);
        info.append(time);

        wrapper.html();

        $('#postingBoard').append(wrapper);

	})
}

var getPosts = function(projectId){
	$.get("/posts/" + projectId,
		function(data, status){
			console.log(data);
			var posts = data.posts;
			console.log(posts);
			console.log('getPosts being called')
			render(posts);
		})
}

var mountBoard = function(projectId){
	clearBoard();
	getPosts(projectId);
}



var setPosts = function(postContent, projectId){
	$.post("/posts", 
		{
			content: postContent,
			projectId: projectId
		}, function(data, status){
			console.log(data, status);
			mountBoard(projectId);
		})
}