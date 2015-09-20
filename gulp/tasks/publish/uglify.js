var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("uglify",function(){

	gulp.src("./public/js/**/*.js")
	.pipe(concat("attire.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("dist"));

});
