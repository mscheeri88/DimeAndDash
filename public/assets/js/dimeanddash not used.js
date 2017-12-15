
$(document).ready(function(){
  $(".main-item li").draggable({helper:"clone"});

  $(".user-items").droppable({drop:function(event,ui){
    $("#test").append($("<li></li>").text(ui.draggable.text()));
  }});


	console.log("dimeanddash.js found");

	// Index Page ==================================================================

	// click on customer button on index page
	$(".customer-button").click (function(){
	    console.log("Customer button was clicked.");

	    // get parameters from billID input box and customer button value
	    var billID = $("#billID").val();
	    var numCustomers = $(this).attr("value");

	    // go to the split-bill page, including parameters
	    var parameters = "cust=" + numCustomers + "&billID=" + billID;
	    location.href = "/split-bill/" + parameters;
	});


	// Split-Bill Page ==============================================================

	$("#submitVenmo").click (function(){
		event.preventDefault();

		var numCustomers = $(".customers").attr("data-customers")

		console.log("numCustomers: " + numCustomers);

	});


	$(".move-button").click (function(){
	    console.log("Move button was clicked.");
	});

}); // end of document.ready function
