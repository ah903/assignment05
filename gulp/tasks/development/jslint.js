var gulp = require('gulp'); 
var jshint = require('gulp-jshint');

gulp.task("lint", function() {
    return gulp.src("./public/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});