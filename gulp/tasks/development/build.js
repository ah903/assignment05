//////////////////////////////////////////////////////////////////
// Gulp Task Build
// Placeholder tasks for application specific build activities
// required such as compilation of SASS, JS Minification
// JSHINT
//////////////////////////////////////////////////////////////////

var gulp = require("gulp");
var runSequence = require("run-sequence");


gulp.task('build', function(callback) {
  runSequence(["lint"],callback);
});

