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
	console.log("New Customer:");
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

// to view table - view all sales of a specific item
router.get("/item-sales", function(req, res) {
	console.log(req.params);

	// retrieve the bill items
	billItem.readOne("bill_id", req.params.billItem, function(data) {
		var itemSaleObject = {
			billItems: data,
			description: req.params.description,
			price: req.params.price
		};
	    console.log(itemSaleObject);
		res.render("item-sale-table", itemSaleObject);
	});
});


module.exports = router;
