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

// get the bill itmes for a specific bill ID
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


// REPORTS ========================================================

// view all sales by item description
router.get("/item-sales", function(req, res) {
	console.log(req.params);

	// retrieve the bill items
	billItem.readAll(function(data) {
		var cleanObjArray = [];
		var itemNames = [];
		for (var i = 0; i < data.length; i ++) {
			if (itemNames.indexOf(data[i].description) === -1) {
				itemNames.push(data[i].description);
			}
		}

		for (var i = 0; i < itemNames.length; i++) {
			var currentName = itemNames[i];
			var quantity = 0;
			var price = 0;
			for (var k = 0; k < data.length; k ++) {
				if (itemNames[i] === data[k].description) {
					price = data[k].price
					quantity++
				}
			}
			var objToDisplay = {}
			objToDisplay.name = currentName;
			objToDisplay.quantity = quantity;
			objToDisplay.price = price;
			objToDisplay.totalSales = price * quantity;
			cleanObjArray.push(objToDisplay);
		}

		var itemSaleObject = {
			billItems: cleanObjArray,
		};
		res.render("item-sale-table", itemSaleObject);
	});
});


// view sales by venmo handle
// page for user to enter venmo handle
router.get("/venmoHandle", function(req, res) {
	res.render("venmoHandle");
});


// generate report page
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

module.exports = router;
