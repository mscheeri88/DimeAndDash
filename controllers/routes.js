var express = require("express");

var router = express.Router();

// Import the models to use the database functions.
var customer = require("../models/customer.js");
var billItem = require("../models/billItem.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
	res.render("index");
});

router.get("/split-bill", function(req, res) {
	billItem.readOne("bill_id", 1005, function(data) {
		var hbsObject = {
			billItems: data
		};
	    console.log(hbsObject);
		res.render("split-bill", hbsObject);
	});
});

// use parameters to render split-bill page

module.exports = router;