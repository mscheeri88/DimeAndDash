
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
	function calcCheckTotals(customerNumber, customerID) {

		var subTotal = 0;
		var taxTotal = 0;
		var tipAmount = 0;

		// calculate subTotal and taxTotal from bill items object
		for (var i = 0; i < billItems.length; i++) {
			if (billItems[i].customer_id == customerID) {
				subTotal = subTotal + billItems[i].price;
				taxTotal = taxTotal + (billItems[i].price * billItems[i].tax_percent / 100);
			}
		};

		// if the total is for a customer, get tip amount from input box
		if (customerNumber > 0) {
			var tipInputID = "#tip" + customerNumber;
			tipAmount = $(tipInputID).val();
			console.log("tipAmount calcCheckTotals:" + tipAmount);
		};

		var total = subTotal + taxTotal + parseFloat(tipAmount);

		// display totals on the check
		var subTotalSelector = "#subTotal" + customerNumber;
		var taxSelector = "#tax" + customerNumber;
		var totalSelector = "#total" + customerNumber;
		$(subTotalSelector).html("$" + subTotal.toFixed(2));
		$(taxSelector).html("$" + taxTotal.toFixed(2));
		$(totalSelector).html("$" + total.toFixed(2));

	}; // end of calcCheckTotals function

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

		var listItemCode =	'<span><p class="check-item">' + billItems[billItemIndex].description + '</p>' +
							'<p class="price">$' + billItems[billItemIndex].price.toFixed(2) + '</p>' +
							// TODO add a move button to a customer list item and bind the move button function 
							//'<select class="select select-customer customer-dropdown" name="customers" id="' + billItemID + '">' +
							//'<option value="0">Return to Check</option>' +
							//'<option value="1">Customer 1</option>' +
							//'<option value="2">Customer 2</option>' +
							//'</select>' +
							//'<button class="move-button button" data-bill-item-id="' + billItemID +
							//'">assign</button>' +
							'</span>';

		newListItem.html(listItemCode);

		// append the new list item to the list for the correct customer
		var listSelector = "#list" + customerNumber;
		$(listSelector).append(newListItem);

	}; // end of displayBillItem function

	// click on move button
	$(".move-button").click(function() {
	    console.log("Move button was clicked.");

	    // get billItemID from move button
		var currentBillItemID = $(this).attr("data-bill-item-id");

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

		// remove the bill item from the current customer list
		// this does not delete the billItem object, just removes it from the display
		var removeSelector = "#li" + currentBillItemID;
		$(removeSelector).remove();

		// display the bill item in the correct customer list
		displayBillItem(currentBillItemID, currentCustomerNumber);

		//recalculate check totals
		// for the check, customerNumber = 0 and customerID = 9999
		calcCheckTotals(0, 9999);

		calcCheckTotals(currentCustomerNumber, currentCustomerID);

		// Send an AJAX POST-request with jQuery
		$.post(
			"/api/updateBillItem",
			{bill_item_id: currentBillItemID, customer_id: currentCustomerID}
		)
		// console log the result
		.done(function(data) {
			console.log(data);
		});

	}); // end of function move button click

	// click on submit payment button
	$("#submit-payment").click(function() {

		console.log("submit-payment button clicked");
	});

	// calculate tip if customer clicks tip button
	$(".customers").on( "click", ".tip-button", function() {

		var tipPercent = $(this).val();
		var currentCustomerNumber = $(this).attr('data-customer-number');
		var currentCustomerID;
		var subTotal = 0;
		var tipAmount = 0;

		// get the customer id from the customers object
		for (var i = 0; i < customers.length; i++) {
		    if (customers[i].customerNumber == currentCustomerNumber) {
		      currentCustomerID = customers[i].customerID;
	    	};
	  	};

	    console.log("tipPercent: " + tipPercent);
	    console.log("currentCustomerNumber: " + currentCustomerNumber);
	    console.log("currentCustomerID: " + currentCustomerID);

	  	//loop through the bill items to get subTotal
	  	for (var i = 0; i < billItems.length; i++) {
	  		if(billItems[i].customer_id == currentCustomerID) {
	  			subTotal = subTotal + billItems[i].price;
	  		};
	  	};

	  	console.log("subTotal: " + subTotal);

	  	tipAmount = (subTotal * tipPercent / 100).toFixed(2);

		console.log("tipAmount: " + tipAmount);	  	

		//add the tipAmount to the customer object
		for (var i = 0; i < customers.length; i++) {
	  		if(customers[i].customerID == currentCustomerID) {
	  			customers[i].tip_amount = tipAmount;
	  		};
	  	};

	  	console.log("Customers:");
	  	console.log(customers);

	  	//update the tip value on screen
	  	var tipInputID = "#tip" + currentCustomerNumber;
	  	$(tipInputID).val(tipAmount);

	  	// update the total on screen
	  	calcCheckTotals(currentCustomerNumber, currentCustomerID);

		// Send an AJAX POST-request with jQuery
		$.post(
			"/api/updateCustomer",
			{customer_id: currentCustomerID, tip_amount: tipAmount}
		)
		// console log the result
		.done(function(data) {
			console.log(data);
		});

	});
 
	// TODO if customer enters tip value manually
	$(".customers").on( "change", ".tip-value", function() {
		console.log("tip amount: " + this.value);
	});

	// Send an AJAX GET-request for bill items
	$.get("/api/billItems/" + billID)
	// On success, run the following code
	.done(function(data) {
		// assign the data to the billItems object
		billItems = data;
		console.log("billItems:")
		console.log(billItems);

		//calculate check totals for the initial page load
		// for the check, customerNumber = 0 and customerID = 9999
		calcCheckTotals(0, 9999);

		// TODO add the bill items to the check dynamically
		// not working at the moment, to do with binding move button function
	});

	// create a div for each customer
	for (var i = 0; i < numCustomers; i++) {
		var customerContainer = $("<div>");

			customerContainer.attr("class", "user-content");

			var customerNumber = (i+1);
			// customerContainer.attr("data-containerID", customerNumber);

			var containerCode =
				'<h3>customer ' + customerNumber + '</h3>' +
				'<form class="venmo-form"><input class="input" type="text" placeholder="@venmo username" id="input' + customerNumber + '">' +
				'<button type="submit" class="submitVenmo button" data-customerNumber=' + customerNumber +'>Submit</button></form>' +
				'<div class="user-items"><ul class="bill-item" id="list' + customerNumber +'"></ul>' +
				'<ul class="customer-totals">' +
				'<li class="list-style-2"><span>Subtotal<p class="price" id="subTotal' + customerNumber +
				'">$0.00</p></span></li>' +
              	'<li class="list-style-2"><span>Tax<p class="price" id="tax' + customerNumber +
              	'">$0.00</p></span></li>' +
              	'<li class="list-style-2"><span>Tip' +
              	'<input type="text" class="tip-value price" value="0.00" id="tip' + customerNumber + '">' +
              	'<label class="tip-label" for="tip' + customerNumber + '">$</label>' +
              	'</span></li>' +
              	'<li class="total"><span>Total<p class="price" id="total' + customerNumber +
              	'">$0.00</p></span></li>' +
            	'</ul></div>'+
                '<div><p class="select-tip">Select Tip Amount</p>' +
        		'<ul class="tip-amount">' +
		        '<li><button class="button tip-button" id="15-btn-tip' + customerNumber + '" data-customer-number="' + customerNumber +
		        '" value="15">15%</button></li>' +
				'<li><button class="button tip-button" id="18-btn-tip' + customerNumber + '" data-customer-number="' + customerNumber +
				'" value="18">18%</button></li>' +
				'<li><button class="button tip-button" id="20-btn-tip' + customerNumber + '" data-customer-number="' + customerNumber +
				'" value="20">20%</button></li>' +
				'<li><button class="button tip-button" id="22-btn-tip' + customerNumber + '" data-customer-number="' + customerNumber +
				'" value="22">22%</button></li>' +
				'</ul></div>';

			customerContainer.html(containerCode);

		$ ("#payment-container").before(customerContainer);
	};

	// update the dropdowns on the bill items to have an option for each customer
	for (var i = 3; i <= numCustomers; i++) {
		var newOption = $("<option>");

		newOption.val(i);
		newOption.text("Customer " + i);

		$ ("#list0").find(".customer-dropdown").append(newOption);
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
