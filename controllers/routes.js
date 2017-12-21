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

router.get("/venmoHandle", function(req, res) {
	res.render("venmoHandle");
});

router.get("/customerReport/handle=:venmoHandle", function(req, res) {
	console.log(req.params);

	var queryString =

	"SELECT customer.venmo_handle, bill_item.description, bill_item.price FROM customer LEFT JOIN bill_item ON customer.customer_id = bill_item.customer_id where customer.venmo_handle ='"+ req.params.venmoHandle + "'";

	connection.query(queryString, function(err, result) {
		if (err) {
		  throw err;
		}
		else{
			console.log("result");
			console.log(result);

			var hbsObject = {
				billItems: result
			};
		};
		res.render("customerReport", hbsObject);
	  });


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

module.exports = router;