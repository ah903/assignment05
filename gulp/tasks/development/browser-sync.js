//////////////////////////////////////////////////////////////////
// Gulp Task Browser Sync
// Live Reloads the browser when any changes occur in the 
// Monitored Fileset
// https://gist.github.com/sogko/b53d33d4f3b40d3b4b2e
//////////////////////////////////////////////////////////////////
// Dependencies
// NodeMon
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var browsersync = require("browser-sync");

//////////////////////////////////////////////////////////////////
// Express is configured to serve on port 3000
// Browser Sync acts as a proxy to Express and serves on
// Configured port 7000 
//////////////////////////////////////////////////////////////////
gulp.task("browser-sync", ['nodemon'], function() {
	return browsersync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});
