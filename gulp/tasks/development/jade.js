var gulp = require("gulp");
var jade = require("gulp-jade");

gulp.task("jade", function(){

	return gulp.src("./bin/views/error.jade")
		.pipe(jade())
		.pipe(gulp.dest("./public"));

});