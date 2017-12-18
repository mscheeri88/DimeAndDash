
$(document).ready(function(){

// DRAGGABLE =======================================================
  $(".main-item li").draggable({helper:"clone"});

  $(".user-items").droppable({drop:function(event,ui){
    $("#test").append($("<li></li>").text(ui.draggable.text()));
  }});

// END OF DRAGGABLE =================================================

	console.log("split-bill.js found");

	// get the number of customers and the billID from the div attributes
	var numCustomers = $(".customers").attr("data-customers");
	var billID = $("#list0").attr("data-bill-id");

	console.log("numCustomers: " + numCustomers);
	console.log("billID: " + billID);

	// initialise billItems and customers objects;
	var billItems = [];
	var customers = [];

	//calculate the tax and total for the check
	function calcCheckTotals() {

		var subTotal = 0;
		var taxTotal = 0;

		for (var i = 0; i < billItems.length; i++) {
			if (billItems[i].customer_id == 9999) {
				subTotal = subTotal + billItems[i].price;
				taxTotal = taxTotal + (billItems[i].price * billItems[i].tax_percent / 100);
			}
		};

		var total = subTotal + taxTotal;

		// display totals on the check
		$("#subTotalCheck").html("$" + subTotal.toFixed(2));
		$("#taxCheck").html("$" + taxTotal.toFixed(2));
		$("#totalCheck").html("$" + total.toFixed(2));

	}; // end of checkTotals function

	// display a bill item in a customer list
	function displayBillItem(billItemID, customerNumber) {
	
		// get array position of bill item
		for (var i = 0; i < billItems.length; i++) {
			if (billItems[i].bill_item_id == billItemID) {
				var billItemIndex = i;
			};
		};

		// create a new list item
		var newListItem = $("<li>");

		newListItem.attr("id","li" + billItemID);

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

		// append the new list item to the list for the correct customer
		var listSelector = "#list" + customerNumber;
		$(listSelector).append(newListItem);	

	}; // end of displayBillItem function

	// click on move button
	$(".move-button").click(function() {
	    console.log("Move button was clicked.");

	    // get billItemID from move button
		var currentBillItemID = $(this).attr("id");

		// get customerID from dropdown
		var dropDownID = "#dd" + currentBillItemID;
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

		console.log(billItems);

		// TODO remove the bill item from the current customer list
		// this function does not delete the billItem object, just removes it from the display
		var removeSelector = "#li" + currentBillItemID;
		$(removeSelector).remove();

		// display the bill item in the correct customer list
		displayBillItem(currentBillItemID, currentCustomerNumber);

		//recalculate check totals
		calcCheckTotals();

	}); // end of function move button click

	// Send an AJAX GET-request for bill items
	$.get("/api/billItems/" + billID)
	// On success, run the following code
	.done(function(data) {
		// assign the data to the billItems object
		billItems = data;
		console.log("billItems:")
		console.log(billItems);

		//calculate check totals for the initial page load
		calcCheckTotals();

		// TODO add the bill items to the check dynamically
		// not working at the moment, to do with binding move button function
		// customerNumber = 0 for the check
		// for (var i = 0; i < billItems.length; i++) {
		// 	displayBillItem(billItems[i].bill_item_id, 0);
		// };
	});

	// create a div for each customer
	for (var i = 0; i < numCustomers; i++) {
		var customerContainer = $("<div>");

			customerContainer.attr("class", "user-content");

			var customerNumber = (i+1);
			customerContainer.attr("data-containerID", customerNumber);

			var containerCode =	
				'<form><input class="input" type="text" placeholder="@venmo username" id="input' + customerNumber + '">' +
				'<button type="submit" class="submitVenmo" data-customerNumber=' + customerNumber +'>Submit</button></form>' +
				'<div class="user-items"><ul id="list' + customerNumber +'"></ul>' +
				'<ul>' +
				'<li class="list-style-2"><span><p>Subtotal</p><p class="price" id="subTotal' + customerNumber +
				'">$0.00</p></span></li>' +
              	'<li class="list-style-2"><span><p>Tax</p><p class="price" id="tax' + customerNumber +
              	'">$0.00</p></span></li>' +
              	'<li class="list-style-2"><span><p>Tip</p><p class="price" id="tip' + customerNumber +
              	'">$0.00</p></span></li>' +
              	'<li class="total"><span><p>Total</p><p class="price" id="total' + customerNumber +
              	'">$0.00</p></span></li>' +
            	'</ul>' +
            	'</div>';

    

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
			// add the new customer to the customers object
			console.log(data);
			console.log("new customerID:" + data.insertId);
			newCustomer.customerID = data.insertId;
			newCustomer.customerNumber = currentCustomer;
			customers.push(newCustomer);

			console.log("customers:");
			console.log(customers);			
		});
	});




}); // end of document.ready function
