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

gulp.task("scripts",function(){

	gulp.src("./public/js/**/*.js")
	.pipe(concat("attire.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/public/js"));

});

gulp.task("styles",function(){

	gulp.src("./public/css/**/*.css")
	.pipe(concat("attire.css"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/public/css"));

});