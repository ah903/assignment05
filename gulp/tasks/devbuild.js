//////////////////////////////////////////////////////////////////
// Gulp Task DevBuild
//////////////////////////////////////////////////////////////////
// Creates a build in the public folder from source code
// This build is a copy of the source directory ie 
// unminified and unoptimised
//////////////////////////////////////////////////////////////////
// It is possible to change what is served in different ways
// 
// 1. Serve from Public Folder 
// If running locally set config/local.json "dist":"public"
// This is default for Heroku deployment
// The content of public may be a copy of development or 
// optimised for production depending whether the script
// devbuild or prodbuild has been used to populate public
//
// 2. Serve from SRC folder
// If running locally set config/local.json "dist":"src"
// Intended to support live reload
// Default for development
///////////////////////////////////////////////////////////////////
// Dependencies : 	gulp       		Gulp Pipleine
//					del 			Folder management
//					gulp-inject 	Script injection
//					gulp-jshint 	Linting Tool
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var clean = require("del");
var inject = require("gulp-inject");
var jshint = require("gulp-jshint");

//////////////////////////////////////////////////////////////////
// Clean The Target Public Folder
//////////////////////////////////////////////////////////////////
gulp.task("devclean",function(){
	return clean(["public/**/*"]);
});

//////////////////////////////////////////////////////////////////
// Copy Favicon after Clean is Completed
//////////////////////////////////////////////////////////////////
gulp.task("devfavicon",["devclean"], function(){

	return gulp.src("src/favicon.ico")
	.pipe(gulp.dest("public"));

});

//////////////////////////////////////////////////////////////////
// Copy attire-app file after clean is completed
//////////////////////////////////////////////////////////////////
gulp.task("devattire",["devclean"], function(){

	return gulp.src("src/attire-app.js")
	.pipe(gulp.dest("public"));

});

//////////////////////////////////////////////////////////////////
// Copy partials file after clean is completed
//////////////////////////////////////////////////////////////////
gulp.task("devpartials",["devclean"], function(){

	return gulp.src("src/partials/**/*.html")
	.pipe(gulp.dest("public/partials"));

});

//////////////////////////////////////////////////////////////////
// Copy images files after clean is completed
//////////////////////////////////////////////////////////////////
gulp.task("devimages",["devclean"], function(){

	return gulp.src("src/img/**/*.*")
	.pipe(gulp.dest("public/img"));

});

//////////////////////////////////////////////////////////////////
// Copy fonts files after clean is completed
//////////////////////////////////////////////////////////////////
gulp.task("devfonts",["devclean"], function(){

	return gulp.src("src/fonts/**/*.*")
	.pipe(gulp.dest("public/fonts"));

});

//////////////////////////////////////////////////////////////////
// Copy CSS files after clean is completed
//////////////////////////////////////////////////////////////////
gulp.task("devcss",["devclean"], function(){

	return gulp.src("src/css/**/*.css")
	.pipe(gulp.dest("public/css"));

});

//////////////////////////////////////////////////////////////////
// Lint the JS and output the report
//////////////////////////////////////////////////////////////////
gulp.task("devlint", function() {
    return gulp.src("src/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

//////////////////////////////////////////////////////////////////
// Copy the JS
//////////////////////////////////////////////////////////////////
gulp.task("devjs",["devclean","devlint"], function(){

	return gulp.src("src/js/**/*.js")
	.pipe(gulp.dest("public/js"));

});

//////////////////////////////////////////////////////////////////
// Inject Deevelopment dependencies into Jade Templates
//////////////////////////////////////////////////////////////////
gulp.task("devinjectjs",["devjs"], function(){

	var jsStream = gulp.src("public/**/*.js",{ignorePath:"public",addRootSlash: false})

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(jsStream,{ignorePath:"public",addRootSlash: false}))
  		.pipe(gulp.dest("./bin/views"));	
});

//////////////////////////////////////////////////////////////////
// Inject CSS dependencies into Jade Templates
//////////////////////////////////////////////////////////////////
gulp.task("devinjectcss",["devcss"], function(){

	var cssStream = gulp.src("public/**/*.css",{ignorePath:"public",addRootSlash: false})

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(cssStream,{ignorePath:"public",addRootSlash: false}))
  		.pipe(gulp.dest("./bin/views"));	
});

//////////////////////////////////////////////////////////////////
// Development Build Script
//////////////////////////////////////////////////////////////////
gulp.task("devCopyFiles",["devfavicon","devattire","devpartials","devimages","devfonts","devcss","devjs","devinjectjs","devinjectcss"]);
gulp.task("devbuild",["devCopyFiles"]);
