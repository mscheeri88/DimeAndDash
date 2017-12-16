
$(document).ready(function(){

  $(".main-item li").draggable({helper:"clone"});

  $(".user-items").droppable({drop:function(event,ui){
    $("#test").append($("<li></li>").text(ui.draggable.text()));
  }});

	console.log("split-bill.js found");

	var billItems = [];

	// Send an AJAX GET-request with jQuery
	$.get("/api/billItems/1001")
	// On success, run the following code
	.done(function(data) {
		// Log the data we found
		billItems = data;
		console.log(billItems);
	});

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
				'<button type="submit" class="submitVenmo" data-customerNumber=' + customerNumber +'>Submit</button></form>' +
				'<div class="user-items"><ul id="list' + customerNumber +'"></ul></div>';

			customerContainer.html(containerCode);

		$ (".customers").prepend(customerContainer);
	};

	// click on submitVenmo button to capture venmo handle and create a customer database record
	$(".submitVenmo").click (function(){
		event.preventDefault();
		var currentCustomer = $(this).attr("data-customerNumber");
		var inputSelector = "#input" + currentCustomer;
		console.log("clicked submit button for customer " + currentCustomer);

		var newCustomer = {
			venmo_handle: $(inputSelector).val().trim(),
			tip_amount: 0
		};

		// Send an AJAX POST-request with jQuery
		$.post("/api/newCustomer", newCustomer)
		// On success, run the following code
		.done(function(data) {
			// Log the data we found
			console.log(data);
			console.log("new customerID:" + data.insertId);
			newCustomer.customerID = data.insertId;
			newCustomer.customerNumber = currentCustomer;
			customers.push(newCustomer);
			console.log(customers);			
		});
	});

	// move bill item to customer list
	function moveBillItem(billItemID, customerNumber) {
	
		for (var i = 0; i < billItems.length; i++) {
			if (billItems[i].bill_item_id == billItemID) {
				var billItemIndex = i;
			};
		};

		var newListItem = $("<li>");

		newListItem.attr("data-bill-item-id",billItemID);

		var listItemCode =	'<span><p>' + billItems[billItemIndex].description +
							'</p><p class="price">$' + billItems[billItemIndex].price +
							'</p><select name="customers" id="' + billItemID + '">' +
							'<option value="0">Return to Check</option>' +
							'<option value="1">Customer 1</option>' +
							'<option value="2">Customer 2</option>' +
							'</select>' +
							'<button class="move-button" data-bill-item-id="' + billItemID +
							'">move it!</button></span>';

		newListItem.html(listItemCode);

		var listSelector = "#list" + customerNumber;

		$(listSelector).append(newListItem);	
	};

	$(".move-button").click (function(){
	    console.log("Move button was clicked.");

	    // get billItemID from submit button
		var currentBillItemID = $(this).attr("data-bill-item-id");

		// get customerID from dropdown
		var dropDownID = "#" + currentBillItemID;
		var currentCustomerNumber = $(dropDownID).val();
		var currentCustomerID = "";

		console.log("currentBillItemID: " + currentBillItemID);
		console.log("currentCustomerNumber: " + currentCustomerNumber);

		// find customerID that goes with customerNumber
		for (var i = 0; i < customers.length; i++) {
			if (customers[i].customerNumber == currentCustomerNumber) {
				currentCustomerID = customers[i].customerID;
			};
		};

		// update bill item object with new customerID
		for (var i = 0; i < billItems.length; i++) {

			if (billItems[i].bill_item_id == currentBillItemID) {
				billItems[i].customer_id = currentCustomerID;
			};
		};

		moveBillItem(currentBillItemID, currentCustomerNumber);
	});

}); // end of document.ready function
