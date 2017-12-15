var express = require("express");

var router = express.Router();

// Import the models to use the database functions.
var customer = require("../models/customer.js");
var billItem = require("../models/billItem.js");

// Routes and Logic ==================================================================

// index page
router.get("/", function(req, res) {
	res.render("index");
});


// use parameters to build the split-bill page
router.get("/split-bill/cust=:customers&billID=:billID", function(req, res) {
	console.log(req.params);

	var currentCustomers = [];

	// create new customer record
	var newCustomer = {
		customerID: 0,
		venmoHandle: "@testVenmoHandle",
		tipAmount: 0
	};

	customer.create({venmo_handle: newCustomer.venmoHandle}, function(result) {

		console.log(result);

		// set the newCustomerID to the ID returned from the database
		// add the new customer to the customer array
		newCustomer.customerID = result.insertId;
		currentCustomers.push(newCustomer);
	});

	// retrieve the bill items
	billItem.readOne("bill_id", req.params.billID, function(data) {
		var billItems = data;

		// render the split-bill page using handlebars
		var hbsObject = {
			billItems: billItems,
			customers: currentCustomers
		};
	    console.log(hbsObject);
		res.render("split-bill", hbsObject);
	});

});

module.exports = router;