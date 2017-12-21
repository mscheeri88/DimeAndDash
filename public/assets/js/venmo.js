

$( "#handle-button" ).click(function() {
	console.log("button clicked");
	
	var venmoHandle = $("#venmoHandle").val();
	console.log("venmohandle", venmoHandle)

	var url = "/customerReport/handle=" + venmoHandle;
	location.href = url; 


});