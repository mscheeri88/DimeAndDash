var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
//var cat = require("../models/cat.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
	res.render("index");
	//res.render("index", hbsObject);
});

module.exports = router;