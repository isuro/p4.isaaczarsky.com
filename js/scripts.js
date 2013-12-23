$().ready(function(){
	$.getJSON("http://www.readability.com/api/content/v1/parser?token=349c3efd94e9cebb53cf6697724b6a7dc6797c5c&url=http://www.theverge.com/2013/12/20/5223788/david-x-cohen-end-of-futurama-interview&callback=?", function(data) {
		$("#content").html(data.content);
	});
})

var fontSize = 14;
var padding = 15;
var lineHeight = 20;

function fontSizePlus(){
	fontSize+= 2;
	lineHeightPlus();
	$("#content").css("font-size", fontSize+"px");
}

function fontSizeMinus(){
	fontSize-=2;
	lineHeightMinus();
	$("#content").css("font-size", fontSize+"px");
}

function paddingPlus(){
	padding+=20;
	$("#content").css({"padding-left":padding,"padding-right":padding})
}

function paddingMinus(){
	padding-=20;
	$("#content").css({"padding-left":padding,"padding-right":padding})
}

function lineHeightPlus(){
	lineHeight+=2;
	$("#content").css("line-height", lineHeight+"px");
}

function lineHeightMinus(){
	lineHeight-=2;
	$("#content").css("line-height", lineHeight+"px");
}

function fontChange(){
	switch($("#font-selector").val()){
		case "sans":
			$("#content").css("font-family", "Helvetica Neue, Helvetica, Arial, sans-serif");
			break;
		case "serif":
			$("#content").css("font-family", "Georgia, Times New Roman, serif");
			break;
		case "fixed":
			$("#content").css("font-family", "Menlo, Courier New, monospace");
			break;
	}
}

function themeChange(){
	switch ($("#theme-selector").val()){
		case "day":
			$("body").css("background-color", "white");
			$("#content").css("color", "black");
			$("#controls").removeClass("navbar-inverse");
			break;
		case "night":
			$("body").css("background-color", "black");
			$("#content").css("color", "white");
			$("#controls").addClass("navbar-inverse");
			break;
		case "solarized-light":
			$("body").css("background-color", "#fdf6e3");
			$("#content").css("color", "#586e75");
			$("#controls").removeClass("navbar-inverse");
			break;
		case "solarized-dark":
			$("body").css("background-color", "#002b36");
			$("#content").css("color", "#93a1a1");
			$("#controls").addClass("navbar-inverse");
			break;
	}
}