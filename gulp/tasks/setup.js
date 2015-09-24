//////////////////////////////////////////////////////////////////
// Gulp Task Setup
// High level task that groups other lower level tasks
// Setup is repsonible for loading test data into the database
// if necessary drooping existing data
//////////////////////////////////////////////////////////////////
// Dependencies
// None
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var runSequence = require("run-sequence");


gulp.task("setup", function(callback) {
  	//runSequence("database-start","loaddata", "database-stop", callback);
  	runSequence("loaddata", callback);
  		
});
