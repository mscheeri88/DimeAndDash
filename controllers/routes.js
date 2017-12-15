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

	// retrieve the bill items
	billItem.readOne("bill_id", req.params.billID, function(data) {
		var hbsObject = {
			customers: req.params.customers,
			billItems: data
		};
	    console.log(hbsObject);
		res.render("split-bill", hbsObject);
	});
});

module.exports = router;