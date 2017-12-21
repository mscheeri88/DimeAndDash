// dependencies
var orm = require("../config/orm.js");

// database queries related to the customer table
var customer = {
	all: function(cb) {
		orm.selectAll("customer", function(res) {
		  cb(res);
		});
	},
	// valuesObject is an object containing key value pairs for the new data
	create: function(valuesObject, cb) {
		orm.insertOne("customer", valuesObject, function(res) {
		  cb(res);
		});
	},
	// searchCol and searchVal indicate which record is to be updated
	update: function(valuesObject, searchCol, searchVal, cb) {
	    orm.updateOne("customer", valuesObject, searchCol, searchVal, function(res) {
	      cb(res);
	    });
	}
};

module.exports = customer;