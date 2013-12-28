function stoppedTyping(){
	if($("textarea#source-url").val().length > 0) {
		$("#submit-post").prop("disabled", false);
	} else { 
		$("#submit-post").prop("disabled", true);
	}
}