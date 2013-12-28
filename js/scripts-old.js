var padding = 15;
var lineHeight = 22;

// var urlHeaderRequest;
// var mimeTypeResponse;

function stoppedTyping(){
	if($("textarea#source-url").val().length > 0) {
		$("#submit-post").prop("disabled", false);
	} else { 
		$("#submit-post").prop("disabled", true);
	}
}

function parseUrl() {
	$("#content").empty();
	$("#title").empty();
	$("#author").empty();

	// urlHeaderRequest = new XMLHttpRequest();
	// urlHeaderRequest.open('GET', $("#url-entry").val(), true);
	// urlHeaderRequest.send();
	// console.log("close...");
	// $.ajax($("#url-entry").val(), {type: "HEAD"}).done(function(data, status, jqXHR){
	// 	console.log(jqXHR.getResponseHeader('content-type').split("/")[0]);
	// 	loadRequestedContent(jqXHR.getResponseHeader('content-type').split("/")[0]);
	// });
	// console.log("after...");

	// $.ajax($("#url-entry").val(), {type: "HEAD", datatype: "jsonp"}).done(function(data, status, jqXHR){
	// 	console.log(jqXHR);
		// loadRequestedContent(jqXHR.getResponseHeader('content-type').split("/")[0]);
	// });

	// $.get($("#url-entry").val(), function(data, status, jqXHR){
	// 	loadRequestedContent(jqXHR.getResponseHeader('content-type').split("/")[0]);
	// });
}

function loadRequestedContent(mimeTypeResponse){
	// urlHeaderRequest.onload = function() {
	// 	mimeTypeResponse = this.getResponseHeader('content-type').split("/")[0];

	//     console.log(mimeTypeResponse);

	switch (mimeTypeResponse) {

		case "video":
			showVideo();
			break;

		case "image":
			// console.log("Used mime!");
			showImage();
			break;

		case "audio":
			showAudio();
			break;

		case "text":
			showArticle();
			break;

		default:
			$("#content").html(
				"<h3>Sorry, I don't really know how to display this.</h3>
				 <a href=\"""\">Click here for the original.</a>"
				);

		// default:
			// switch ($("#url-entry").val().slice(-4)){

			// 	case ".mov":
			// 	case ".m4v":
			// 	case ".wmv":
			// 	case ""

			// 	case ".png":
			// 	case ".gif":
			// 	case ".jpg":
			// 	case "jpeg":
			// 	case ".tif":
			// 		showImage();
			// 		break;

			// 	default:
			//		showArticle();
			// }
	}
	// }

	$("#url-entry").blur();
}

function fontSizePlus(){
	lineHeightPlus();
	$("#story *").css("font-size", "+=2");
}

function fontSizeMinus(){
	lineHeightMinus();
	$("#story *").css("font-size", "-=2");
}

function paddingPlus(){
	padding+=20;
	$("#content").css({"padding-left":padding,"padding-right":padding});
	if(padding > 15) {$("#padding-minus").prop("disabled", false)}
}

function paddingMinus(){
	padding-=20;
	$("#content").css({"padding-left":padding,"padding-right":padding});
	if(padding <= 15) {$("#padding-minus").prop("disabled", true)}
}

function lineHeightPlus(){
	lineHeight+=2;
	$("#content").css("line-height", lineHeight + "px");
}

function lineHeightMinus(){
	lineHeight-=2;
	$("#content").css("line-height", lineHeight + "px");
}

function fontChange(){
	switch($("#font-selector").val()){
		case "serif":
			$("#story *").css("font-family", "Georgia, Times New Roman, serif");
			break;
		case "sans":
			$("#story *").css("font-family", "Helvetica Neue, Helvetica, Arial, sans-serif");
			break;
		case "fixed":
			$("#story *").css("font-family", "Menlo, Courier New, monospace");
			break;
	}
}

function themeChange(){
	switch ($("#theme-selector").val()){
		case "day":
			$("body").css("background-color", "white");
			$("#story").css("color", "black");
			$("#controls").removeClass("navbar-inverse");
			break;
		case "night":
			$("body").css("background-color", "black");
			$("#story").css("color", "white");
			$("#controls").addClass("navbar-inverse");
			break;
		case "solarized-light":
			$("body").css("background-color", "#fdf6e3");
			$("#story").css("color", "#586e75");
			$("#controls").removeClass("navbar-inverse");
			break;
		case "solarized-dark":
			$("body").css("background-color", "#002b36");
			$("#story").css("color", "#93a1a1");
			$("#controls").addClass("navbar-inverse");
			break;
	}
}

function showImage(){

	$("#content").html(
		"<img src=\"" + $("#url-entry").val() + "\" class=\"img-responsive\" id=\"image\">"
		);
	$("#text-controls").hide();
	realWidth = document.getElementById("image").naturalWidth;
	realHeight = document.getElementById("image").naturalHeight;
	if ($("#image").width() < realWidth ||  $("#image").height() < realHeight) {
		$("#image-controls").show();
	};
}

function imageResize(){
	$("#image").toggleClass("img-responsive");
}

function showArticle(){
	$.getJSON("http://www.readability.com/api/content/v1/parser?token=349c3efd94e9cebb53cf6697724b6a7dc6797c5c&url="+$("#url-entry").val()+"&callback=?", function(data) {
		$("#content").html(data.content);
		$("#title").html(data.title);
		$("#author").html("By "+data.author+" — "+data.domain);
	});
	$("#image-controls").hide();
	$("#text-controls").show();
}

function showVideo(){
	$("head").append("<link href=\"http://vjs.zencdn.net/4.2/video-js.css\" rel=\"stylesheet\">
		<script src=\"http://vjs.zencdn.net/4.2/video.js\"></script>")
	$("#content").html("<video id=\"video\" class=\"video-js vjs-default-skin\"
		controls preload=\"auto\">
		<source src=\"""\" type=\'video\' />
		</video>");
	videojs("video", {}, function(){
		// Player (this) is initialized and ready.
	});
}

function showAudio(){

}