var connection = require("./connection.js");

// Object Relational Mapping (ORM)

var orm = {
  selectAll: function(tableName, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, tableName, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(tableName, valuesObject, cb) {
    var queryString = "INSERT INTO ?? SET ?";
    connection.query(queryString, [tableName, valuesObject], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateOne: function(tableName, valuesObject, searchCol, searchVal, cb) {
    var queryString = "UPDATE ?? SET ? WHERE ?? = ?";
    connection.query(queryString, [tableName, valuesObject, searchCol, searchVal], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;