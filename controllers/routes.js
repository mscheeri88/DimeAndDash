var express = require("express");

var router = express.Router();

// Import the models to use the database functions.
var customer = require("../models/customer.js");
var billItem = require("../models/billItem.js");

// Routes and Logic ==================================================================

// index page
router.get("/", function(req, res) {

	var billIDs = [];

	billItem.readAll(function(data){

		// add bill IDs to billIDs array
		for (var i = 0; i < data.length; i++) {
			if (billIDs.indexOf(data[i].bill_id) == -1) {
				billIDs.push(data[i].bill_id)
			};
		};

		var hbsObject = {
			billIDs : billIDs
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});

});


// use parameters to build the split-bill page
router.get("/split-bill/cust=:customers&billID=:billID", function(req, res) {
	console.log(req.params);

	// retrieve the bill items
	billItem.readOne("bill_id", req.params.billID, function(data) {
		var hbsObject = {
			customers: req.params.customers,
			billID: req.params.billID,
			billItems: data
		};
	    console.log(hbsObject);
		res.render("split-bill", hbsObject);
	});
});

router.get("/api/billItems/:billID", function(req,res) {
	console.log(req.params);

	// retrieve the bill items
	billItem.readOne("bill_id", req.params.billID, function(data) {
		res.json(data);
	});
});

// receive new customer info and log to database
router.post("/api/newCustomer", function(req,res) {
	console.log("New customer:");
	console.log(req.body);
	customer.create({
		venmo_handle: req.body.venmo_handle,
		tip_amount: req.body.tip_amount
		},
		function(results){
			res.json(results);
		}
	);
});

// receive updated customer info and log to database
router.post("/api/updateCustomer", function(req,res) {
	console.log("Updated customer:");
	console.log(req.body);
	customer.update(
		{tip_amount: req.body.tip_amount},
		'customer_id',
		req.body.customer_id,
		function(results){
			res.json(results);
		}
	);
});

// receive updated bill item info and log to database
router.post("/api/updateBillItem", function(req,res) {
	console.log("Updated bill item:");
	console.log(req.body);
	billItem.update(
		{customer_id: req.body.customer_id},
		'bill_item_id',
		req.body.bill_item_id,
		function(results){
			res.json(results);
		}
	);
});

module.exports = router;