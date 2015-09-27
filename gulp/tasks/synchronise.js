//////////////////////////////////////////////////////////////////
// Gulp Task Synchronise
//////////////////////////////////////////////////////////////////
// Live Reload Browser When source folders change
// Watches a folder tree based on the dist setting in
// config/local.json [src,public], defaults to src
///////////////////////////////////////////////////////////////////
// Dependencies : 	gulp       		Gulp Pipleine
//					browser-synch	Live Reload
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var browsersync = require("browser-sync");
var nconf = require("nconf");


////////////////////////////////////////////////////////////////////////////////
// Get The Configuration For The Environment and load
////////////////////////////////////////////////////////////////////////////////
nconf.argv().env().file({ file:"config/config." + (process.env.NODE_ENV || "DEV") + ".json"});
console.log("Using Config config." + (process.env.NODE_ENV || "DEV") + ".json");

var portToProxy = nconf.get("PORT");
var watchFolder=nconf.get("DIST") || "src";

//////////////////////////////////////////////////////////////////
// Set up browser synchronisation on the source folder
// Note not required for public folder which is constructed
// via build process and may reflect a copy of development
// or an optimised output created from source
//////////////////////////////////////////////////////////////////
gulp.task("synchronise", function() {
	return browsersync.init(null, {
		proxy: "http://localhost:" + portToProxy,
        files: [watchFolder + "/**/*.*","./bin/views/*.jade"],
        browser: "google chrome",
        port: 7000,
	});
});