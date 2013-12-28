$(window).ready(function(){

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
	if(sourceUrl.indexOf("youtube") >= 0 || sourceUrl.indexOf("vimeo") >=0) {
		$(window).load( function(){ 
			$("iframe").width($("#content").width());
			$("iframe").height(Math.round($("#content").width()/16*9));
		});
	}
	else{
		$("#text-controls").show();
	}
}

function showVideo(){
	var videoFormat;

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
	$("head").append("<link href=\"http://vjs.zencdn.net/4.2/video-js.css\" rel=\"stylesheet\">	<script src=\"http://vjs.zencdn.net/4.2/video.js\"></script>");
	$("#content").html("<video id=\"video\" class=\"video-js vjs-default-skin vjs-big-play-centered\"	controls preload=\"auto\" width=\""+$("#content").width()+"\" height=\""+Math.round($("#content").width()/16*9)+"\"> <source src=\""+sourceUrl+"\" type=\'video/"+videoFormat+"\' /> </video>");
	$(window).load( function(){ videojs("video", {}, function(){
		// Player (this) is initialized and ready.
	});});
}

function showAudio(){
	$("head").append("<script src=\"/js/audiojs/audio.min.js\"></script>");
	$("#content").html("<audio src=\""+sourceUrl+"\" preload=\"auto\" />");
	audiojs.events.ready(function() {
	  	var as = audiojs.createAll();
	});
}

function showApplication(){
	$("#content").html("<embed src=\""+sourceUrl+"\" width=\""+$("#content").width()+"\" height=\""+Math.round($("#content").width()/4*3)+"\">");
}