$(window).ready(function(){ // The master parsing function uses the header reported Content-Type of a url

	$("#back-button").show();

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

		case "application":
			showApplication();
			break;

		default:
			showArticle();
			$("#original-link").after(
				"<p><em>I'm not 100% sure I'm displaying this correctly. If something seems off, click \'view original\' above.</em></p>"
				);
		}
	});

function fontSizePlus(){
	lineHeightPlus();
	$("#content").css("font-size", "+=2");
}

function fontSizeMinus(){
	lineHeightMinus();
	$("#content").css("font-size", "-=2");
}

// For some reason jQuery won't increment padding or line-height like font-size
// As a result, these values are tracked independantly with variables
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
			$("#story").css("color", "#657b83");
			$("#controls").removeClass("navbar-inverse");
			break;
		case "solarized-dark":
			$("body").css("background-color", "#002b36");
			$("#story").css("color", "#839496");
			$("#controls").addClass("navbar-inverse");
			break;
	}
}

function showImage(){

	$("#content").html(
		"<img src=\"" + sourceUrl + "\" class=\"img-responsive\" id=\"image\">"
		);

	realWidth = document.getElementById("image").naturalWidth;
	realHeight = document.getElementById("image").naturalHeight;
	// This checks if an image has been shrunken to fit
	if ($("#image").width() < realWidth ||  $("#image").height() < realHeight) {
		$("#image-controls").show(); // If so it reveals the toggle
	};
}

function imageResize(){
	// img-responsive is the Bootstrap class that resizes the image to fit
	$("#image").toggleClass("img-responsive");
}

function showArticle(){
	// Rather than store everything on the server, a fresh request is made to Readability
	$.getJSON("http://www.readability.com/api/content/v1/parser?token=349c3efd94e9cebb53cf6697724b6a7dc6797c5c&url="+sourceUrl+"&callback=?", function(data) {
		$("#content").html(data.content);
		$("#title").html(data.title);
		if(data.author != null){
			$("#author").html("By "+data.author+" — "+data.domain);
		}
		else{
			$("#author").html(data.domain);
		}
	});

	// If the url is from youtube or vimeo, the player should be full size
	if(sourceUrl.indexOf("youtube") >= 0 || sourceUrl.indexOf("vimeo") >=0) {
		$(window).load( function(){ 
			$("iframe").width($("#content").width());
			$("iframe").height(Math.round($("#content").width()/16*9));
		});
	}
	// Otherwise, show the text controls
	else{
		$("#text-controls").show();
	}
}

function showVideo(){
	var videoFormat;

	// The video player requires the source encoding
	// This is ascertained based on the file extension, somewhat haphazardly
	// Doing it with another HEAD request might be more elegant, but would introduce
	// more edge cases and potential points of failure, this covers most popular formats
	switch(sourceUrl.substr(sourceUrl.lastIndexOf(".")+1)) {

		case "flv":
			videoFormat = "x-flv";
			break;
		case "mp4":
		case "m4v":
			videoFormat = "mp4";
			break;
		case "3gp":
			videoFormat = "3gpp";
			break;
		case "mov":
			videoFormat = "quicktime";
			break;
		case "avi":
			videoFormat = "x-msvideo";
			break;
		case "wmv":
			videoFormat = "x-ms-wmv";
			break;
		case "mpg":
		case "mpeg":
			videoFormat = "mpeg";
			break;
		case "ogg":
		case "ogv":
			videoFormat = "ogg";
			break;
		case "webm":
			videoFormat = "webm";
			break;
		case "mkv":
			videoFormat = "x-matroska";
			break;
		default:
			videoFormat = sourceUrl.substr(sourceUrl.lastIndexOf(".")+1);

	}

	// Load the video.js player, which supports flash fallback for the html5 video element

	$("head").append("<link href=\"http://vjs.zencdn.net/4.2/video-js.css\" rel=\"stylesheet\">	<script src=\"http://vjs.zencdn.net/4.2/video.js\"></script>");
	$("#content").html("<video id=\"video\" class=\"video-js vjs-default-skin vjs-big-play-centered\"	controls preload=\"auto\" width=\""+$("#content").width()+"\" height=\""+Math.round($("#content").width()/16*9)+"\"> <source src=\""+sourceUrl+"\" type=\'video/"+videoFormat+"\' /> </video>");

	// Wait for load to ensure that all the components are ready
	$(window).load( function(){ videojs("video", {}, function(){
		// Player (this) is initialized and ready.
	});});
}

function showAudio(){
	// Unlike video, the audio tag doesn't seem to care about being told about encoding
	$("head").append("<script src=\"/js/audiojs/audio.min.js\"></script>");
	$("#content").html("<audio src=\""+sourceUrl+"\" preload=\"auto\" />");

	// Because it's local, audio.js doesn't need to wait for load
	audiojs.events.ready(function() {
	  	var as = audiojs.createAll();
	});
}

function showApplication(){
	// This is mainly for PDFs, whose content-type is 'application/pdf'
	// Theoretically it should work for other applications too, though
	$("#content").html("<embed src=\""+sourceUrl+"\" width=\""+$("#content").width()+"\" height=\""+Math.round($("#content").width()/4*3)+"\">");
}