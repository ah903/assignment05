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
nconf.file("config/local.json").env();
var watchFolder=nconf.get("dist") || "src";

//////////////////////////////////////////////////////////////////
// Set up browser synchronisation on the source folder
// Note not required for public folder which is constructed
// via build process and may reflect a copy of development
// or an optimised output created from source
//////////////////////////////////////////////////////////////////
gulp.task("synchronise", function() {
	return browsersync.init(null, {
		proxy: "http://localhost:5001",
        files: [watchFolder + "/**/*.*","./bin/views/*.jade"],
        browser: "google chrome",
        port: 7000,
	});
});