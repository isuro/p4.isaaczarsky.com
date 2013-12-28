$(window).load(function(){

	$("#original-link").attr("href", sourceUrl);

	switch (mediaType) {

		case "video":
			showVideo();
			break;

		case "image":
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
				"<h3>Sorry, I don't really know how to display this.</h3> <a href=\"#\" onclick=\"showArticle()\">Click here to try to display it anyway.</a>"
				);
		}
	});

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
		"<img src=\"" + sourceUrl + "\" class=\"img-responsive\" id=\"image\">"
		);
	// $("#text-controls").hide();
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
	$.getJSON("http://www.readability.com/api/content/v1/parser?token=349c3efd94e9cebb53cf6697724b6a7dc6797c5c&url="+sourceUrl+"&callback=?", function(data) {
		$("#content").html(data.content);
		$("#title").html(data.title);
		$("#author").html("By "+data.author+" — "+data.domain);
	});
	// $("#image-controls").hide();
	$("#text-controls").show();
}

function showVideo(){
	$("head").append("<link href=\"http://vjs.zencdn.net/4.2/video-js.css\" rel=\"stylesheet\">	<script src=\"http://vjs.zencdn.net/4.2/video.js\"></script>")
	$("#content").html("<video id=\"video\" class=\"video-js vjs-default-skin\"	controls preload=\"auto\"> <source src=\"http\" type=\'video\' /> </video>");
	videojs("video", {}, function(){
		// Player (this) is initialized and ready.
	});
}

function showAudio(){
	$("head").append("<script src=\"/js/audiojs/audio.min.js\"></script>");
	audiojs.events.ready(function() {
	  	var as = audiojs.createAll();
	});
	$("#content").html("<audio src=\""+sourceUrl+"\" preload=\"auto\" />");
}