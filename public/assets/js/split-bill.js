
$(document).ready(function(){

  $(".main-item li").draggable({helper:"clone"});

  $(".user-items").droppable({drop:function(event,ui){
    $("#test").append($("<li></li>").text(ui.draggable.text()));
  }});


	console.log("split-bill.js found");

	var numCustomers = $(".customers").attr("data-customers");

	console.log("numCustomers: " + numCustomers);

	var customers = [];

	// create a div for each customer
	for (var i = 0; i < numCustomers; i++) {
		var customerContainer = $("<div>");

			customerContainer.attr("class", "user-content");

			var customerNumber = (i+1);
			customerContainer.attr("data-containerID", customerNumber);

			var containerCode =	
				'<form><input class="input" type="text" placeholder="@venmo username" id="input' + customerNumber + '">' +
				'<button type="submit" class="submitVenmo" data-submitID=' + customerNumber +'>Submit</button></form>' +
				'<div class="user-items"><ol id=test></ol></div>';

			customerContainer.html(containerCode);

		$ (".customers").prepend(customerContainer);
	};

	// click on submitVenmo button to capture venmo handle and create a customer database record
	$(".submitVenmo").click (function(){
		event.preventDefault();
		var currentCustomer = $(this).attr("data-submitID");
		var inputSelector = "#input" + currentCustomer;
		console.log(currentCustomer + " submit button clicked");
		var newCustomer = {
			venmo_handle: $(inputSelector).val().trim(),
			tip_amount: 0
		};

		// Send an AJAX POST-request with jQuery
		$.post("/api/newCustomer", newCustomer)
		// On success, run the following code
		.done(function(data) {
			// Log the data we found
			console.log("new customerID:" + data.insertId);
			newCustomer.customerID = data.insertId;
			newCustomer.customerNumber = currentCustomer;
			customers.push(newCustomer);
			console.log(customers);
		});
	});

	$(".move-button").click (function(){
	    console.log("Move button was clicked.");
	});

}); // end of document.ready function
