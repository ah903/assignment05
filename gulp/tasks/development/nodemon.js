//////////////////////////////////////////////////////////////////
// Gulp Task Nodemon
// Start Nodemon managing preventing multiple instances which
// will clash due to port configurations
// https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e
//////////////////////////////////////////////////////////////////
// Dependencies	: build 
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");

gulp.task("nodemon", ["build"], function (callback) {
	
	var started = false;

	////////////////////////////////////////////////////////	
	// Return the stream so it can be chained with other
	// functionality
	////////////////////////////////////////////////////////
	nodemon({script: "./bin/www"}).on("start", function () {
		if (!started) {
			callback();
			started = true; 
		} 
	});
});