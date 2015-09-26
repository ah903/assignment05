//////////////////////////////////////////////////////////////////
// Gulp Task uglify
// Uglifies the source
//////////////////////////////////////////////////////////////////
// Dependencies
// None
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var gulpif = require("gulp-if");
var inject = require("gulp-inject");

////////////////////////////////////////////////////////////////////////////////
// Get The Configuration For The Environment and load
////////////////////////////////////////////////////////////////////////////////
var env = process.env.NODE_ENV || "Development"

gulp.task("js", function(){

	var appStream = gulp.src("src/js/**/*.js", {cwd:"public"})
		.pipe(gulpif(env==="Production",concat("attire.min.js")))
		.pipe(gulpif(env==="Production",uglify()))
		.pipe(gulp.dest("public/dist/js"))

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(appStream))
  		.pipe(gulp.dest("./bin/views/test"));	

});


//gulp.task("scripts",function(){
//
//	var appStream = gulp.src("./public/js/**/*.js")
//		.pipe(concat("attire.min.js"))
//		.pipe(gulpif(env==="Production",uglify()))
//		.pipe(gulp.dest("./dist/public/js"));
//
//	return gulp.src("./dist/index.html")
// 		.pipe(inject(appStream))
//  		.pipe(gulp.dest("./dist"));
//
//});


gulp.task("styles",function(){

	var cssStream = gulp.src("./public/src/css/**/*.css")
	.pipe(gulpif(env==="Production",concat("attire.min.css")))
	.pipe(gulpif(env==="Production",cssmin()))
	.pipe(gulp.dest("./public/dist/css"));

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(cssStream))
  		.pipe(gulp.dest("./bin/views/test"));

});