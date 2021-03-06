var express = require("express");
var bodyParser = require("body-parser");
var hbHelpers = require("./controllers/hbHelpers.js");

var port = process.env.PORT || 3000;

var app = express();


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


// Setup for bodyParser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Setup for Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ 
	defaultLayout: "main", 
	helpers: hbHelpers
}));

//app.engine('handlebars', hbs.engine);
app.set("view engine", "handlebars");


// Import routes and give the server access to them.
var routes = require("./controllers/routes.js");

app.use("/", routes);


// Start the server to begin listening.
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
