//////////////////////////////////////////////////////////////////
// Gulp Task Default
// High level task that groups other lower level tasks
// default reperesents the development workflow of
// ensuring the database is started, running the build
// scripts and setting up live reload and watches
//////////////////////////////////////////////////////////////////
// Dependencies
// None
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var runSequence = require("run-sequence");

gulp.task("default", function(callback) {
  	runSequence("database-start","build", "watch", callback);
});
