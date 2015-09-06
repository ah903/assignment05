// Module Dependencies Included through Node CommonJS Require system
// Middleware dependencies
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var mongoose = require("mongoose");
var logger = require("morgan");
var path = require("path");

// Required Custom Middleware supporting the application
var routes = require("./routes/index");
var products = require("./routes/products");
var search = require("./routes/search");
var reviews = require("./routes/reviews");
var users = require("./routes/users");

// Start the server
var app = express();

// view engine setup using Jade Template Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Routing Middleware for all received Requests. Typically adds data
// To The Request Object Creating a pipeline of activity that is
// run before more specific verb and mount point middleware is fired

//Static Server for Application favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Morgan Logging for Dev Environment
app.use(logger("dev"));

// Body parser to read JSON data from the message body
app.use(bodyParser.json());

// Body parser to read URL encoded data from the query string
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie Parser Reads and Processes Cookies
app.use(cookieParser());

// Statuc Content Server Targetting the Pulic Folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to the database
mongoose.connect("mongodb://localhost:27017/attire-db0-dev");


// Application Specific Middleware Handled in Separate Modules
// Uses different mount points for each application middleware
app.use("/", routes);
app.use("/products", products);
app.use("/search", search);
app.use("/reviews", reviews);
app.use("/users", users);

app.param("/search/Menswear", function(req, res, next, value) {
    console.log("Group " + group);
    req.query.group = group;
    next();
});

app.param("/search/Trousers", function(req, res, next, category) {

    console.log("Category " + category);
    req.query.category = category;
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

// Error handlers for different environments derived from Node ENV parameter
// Development error handler to print the stacktrace
// Default Returns Internal Server Error HTTP 500 and shows error page
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// Production error handler No stacktraces leaked to user
// Default Returns Internal Server Error HTTP 500 and shows error page
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});


module.exports = app;
