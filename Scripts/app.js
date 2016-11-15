var state = {
	BASE_URL: "https://www.googleapis.com/youtube/v3/search",
	API_KEY: "AIzaSyDboxA9q_I7ADeF7PgXeOAyYRmiNQXT1rw"
};

$(document).ready(function() {


	$("form").on("click", "button", function(event) {
		var query = $(this).siblings("input").val();
		state.data = getData(query, displayData);
	});

	$("input").keypress(function (event) {
		if (event.which == 13) {
			$('button').click();
			return false;
		}
	});

});

function getData(query, callback) {
	var settings = {
		url: state.BASE_URL,
		data: {
			part: 'snippet',
			key: state.API_KEY,
			q: query,
		},
		dataType: 'json',
		type: 'GET',
		success: callback,
	};
	$.ajax(settings);
}

function displayData(data) {
	console.log(data);
	var itemsHTML = "";
	for (var i = 0; i < data.items.length; i++) {
		itemsHTML+='<li><a href="https://www.youtube.com/watch?v='+data.items[i].id.videoId+'"><img src="'+
		data.items[i].snippet.thumbnails.medium.url+'"></a></li>';
	}
	$("ul").html(itemsHTML);
}