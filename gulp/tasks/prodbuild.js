//////////////////////////////////////////////////////////////////
// Gulp Task prodBuild
//////////////////////////////////////////////////////////////////
// Creates a build in the public folder from source code
// This build is a copy of the source directory but optimised
// for production delivery
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
//////////////////////////////////////////////////////////////////
// Dependencies : 	gulp       		Gulp Pipleine
//					del 			Folder management
//					gulp-inject 	Script injection
//					gulp-jshint 	Linting Tool
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var clean = require("del");
var jshint = require('gulp-jshint');
var uglify = require("gulp-uglify");
var cssmin = require("gulp-cssmin");
var concat = require("gulp-concat");
var inject = require("gulp-inject");

//////////////////////////////////////////////////////////////////
// Clean The Target Public Folder
//////////////////////////////////////////////////////////////////
gulp.task("prodclean", function(){
	return clean(["public/**/*"]);
});

//////////////////////////////////////////////////////////////////
// Copy Favicon after Clean is Completed
//////////////////////////////////////////////////////////////////
gulp.task("prodfavicon",["prodclean"], function(){

	return gulp.src("src/favicon.ico")
	.pipe(gulp.dest("public"));

});

//////////////////////////////////////////////////////////////////
// Copy attire-app file after clean is completed
//////////////////////////////////////////////////////////////////
gulp.task("prodattire",["prodclean"], function(){

	return gulp.src("src/attire-app.js")
	.pipe(uglify())
	.pipe(gulp.dest("public"));

});

//////////////////////////////////////////////////////////////////
// Copy partials file after clean is completed
//////////////////////////////////////////////////////////////////
gulp.task("prodpartials",["prodclean"],function(){

	return gulp.src("src/partials/**/*.html")
	.pipe(gulp.dest("public/partials"));

});

//////////////////////////////////////////////////////////////////
// Copy images files after clean is completed
//////////////////////////////////////////////////////////////////
gulp.task("prodimages",["prodclean"],function(){

	return gulp.src("src/img/**/*.*")
	.pipe(gulp.dest("public/img"));

});

//////////////////////////////////////////////////////////////////
// Copy fonts files after clean is completed
//////////////////////////////////////////////////////////////////
gulp.task("prodfonts",["prodclean"],function(){

	return gulp.src("src/fonts/**/*.*")
	.pipe(gulp.dest("public/fonts"));

});

//////////////////////////////////////////////////////////////////
// Copy CSS files through a minification and concat pipeline
//////////////////////////////////////////////////////////////////
gulp.task("prodcss",["prodclean"],function(){

	return gulp.src("src/css/**/*.css")
	.pipe(concat("attire.min.css"))
	.pipe(cssmin())
	.pipe(gulp.dest("public/css"));

});

//////////////////////////////////////////////////////////////////
// Lint the JS and output the report
//////////////////////////////////////////////////////////////////
gulp.task("prodlint", function() {
    return gulp.src("src/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

//////////////////////////////////////////////////////////////////
// Copy the JS through an uglify pipeline
//////////////////////////////////////////////////////////////////
gulp.task("prodjs",["prodclean","prodlint"],function(){

	return gulp.src("src/js/**/*.js")
	.pipe(concat("attire.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("public/js"));

});

//////////////////////////////////////////////////////////////////
// Inject Deevelopment dependencies into Jade Templates
//////////////////////////////////////////////////////////////////
gulp.task("prodinjectjs",["prodjs"], function(){

	var jsStream = gulp.src("public/**/*.js",{ignorePath:"public",addRootSlash: false})

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(jsStream,{ignorePath:"public",addRootSlash: false}))
  		.pipe(gulp.dest("./bin/views"));	
});

//////////////////////////////////////////////////////////////////
// Inject CSS dependencies into Jade Templates
//////////////////////////////////////////////////////////////////
gulp.task("prodinjectcss",["prodcss"], function(){

	var cssStream = gulp.src("public/**/*.css",{ignorePath:"public",addRootSlash: false})

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(cssStream,{ignorePath:"public",addRootSlash: false}))
  		.pipe(gulp.dest("./bin/views"));	
});

//////////////////////////////////////////////////////////////////
// Production Build Script
//////////////////////////////////////////////////////////////////
gulp.task("prodCopyFiles",["prodfavicon","prodattire","prodpartials","prodimages","prodfonts","prodcss","prodjs","prodinjectjs","prodinjectcss"]);
gulp.task("prodbuild",["prodCopyFiles"]);
