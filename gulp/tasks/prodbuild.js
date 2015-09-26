var gulp = require("gulp");
var clean = require("del");
var jshint = require('gulp-jshint');
var uglify = require("gulp-uglify");
var cssmin = require("gulp-cssmin");
var concat = require("gulp-concat");
var inject = require("gulp-inject");

gulp.task("prodclean", function(){
	return clean(["public/**/*"]);
});

gulp.task("prodfavicon",["prodclean"], function(){

	return gulp.src("src/favicon.ico")
	.pipe(gulp.dest("public"));

});

gulp.task("prodattire",["prodclean"], function(){

	return gulp.src("src/attire-app.js")
	.pipe(uglify())
	.pipe(gulp.dest("public"));

});

gulp.task("prodpartials",["prodclean"],function(){

	return gulp.src("src/partials/**/*.html")
	.pipe(gulp.dest("public/partials"));

});

gulp.task("prodimages",["prodclean"],function(){

	return gulp.src("src/img/**/*.*")
	.pipe(gulp.dest("public/img"));

});

gulp.task("prodfonts",["prodclean"],function(){

	return gulp.src("src/fonts/**/*.*")
	.pipe(gulp.dest("public/fonts"));

});

gulp.task("prodcss",["prodclean"],function(){

	return gulp.src("src/css/**/*.css")
	.pipe(concat("attire.min.css"))
	.pipe(cssmin())
	.pipe(gulp.dest("public/css"));

});

gulp.task("prodlint", function() {
    return gulp.src("src/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("prodjs",["prodclean","prodlint"],function(){

	return gulp.src("src/js/**/*.js")
	.pipe(concat("attire.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("public/js"));

});

gulp.task("prodinjectjs",["prodjs"], function(){

	var jsStream = gulp.src("public/**/*.js",{ignorePath:"public",addRootSlash: false})

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(jsStream,{ignorePath:"public",addRootSlash: false}))
  		.pipe(gulp.dest("./bin/views"));	
});

gulp.task("prodinjectcss",["prodcss"], function(){

	var cssStream = gulp.src("public/**/*.css",{ignorePath:"public",addRootSlash: false})

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(cssStream,{ignorePath:"public",addRootSlash: false}))
  		.pipe(gulp.dest("./bin/views"));	
});

gulp.task("prodCopyFiles",["prodfavicon","prodattire","prodpartials","prodimages","prodfonts","prodcss","prodjs","prodinjectjs","prodinjectcss"]);
gulp.task("prodbuild",["prodCopyFiles"]);
