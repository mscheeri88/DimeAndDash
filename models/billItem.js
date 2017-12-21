// dependencies
var orm = require("../config/orm.js");

// database queries related to the bill_item table
var billItem = {
	readAll: function(cb) {
		orm.selectAll("bill_item", function(res) {
		  cb(res);
		});
	},
	// searchCol and searchVal indicate which records are to be retrieved
	readOne: function(searchCol, searchVal, cb) {
		orm.selectOne("bill_item", searchCol, searchVal, function(res) {
		  cb(res);
		});
	},
	// valuesObject is an object containing key value pairs for the new data
	create: function(valuesObject, cb) {
		orm.insertOne("bill_item", valuesObject, function(res) {
		  cb(res);
		});
	},
	// searchCol and searchVal indicate which record is to be updated
	update: function(valuesObject, searchCol, searchVal, cb) {
	    orm.updateOne("bill_item", valuesObject, searchCol, searchVal, function(res) {
	      cb(res);
	    });
	}
};

module.exports = billItem;