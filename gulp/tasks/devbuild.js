var gulp = require("gulp");
var clean = require("del");
var inject = require("gulp-inject");
var jshint = require('gulp-jshint');
var browsersync = require("browser-sync");

gulp.task("devclean",function(){
	return clean(["public/**/*"]);
});

gulp.task("devfavicon",["devclean"], function(){

	return gulp.src("src/favicon.ico")
	.pipe(gulp.dest("public"));

});

gulp.task("devattire",["devclean"], function(){

	return gulp.src("src/attire-app.js")
	.pipe(gulp.dest("public"));

});

gulp.task("devpartials",["devclean"], function(){

	return gulp.src("src/partials/**/*.html")
	.pipe(gulp.dest("public/partials"));

});

gulp.task("devimages",["devclean"], function(){

	return gulp.src("src/img/**/*.*")
	.pipe(gulp.dest("public/img"));

});

gulp.task("devfonts",["devclean"], function(){

	return gulp.src("src/fonts/**/*.*")
	.pipe(gulp.dest("public/fonts"));

});

gulp.task("devcss",["devclean"], function(){

	return gulp.src("src/css/**/*.css")
	.pipe(gulp.dest("public/css"));

});

gulp.task("devlint", function() {
    return gulp.src("src/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("devjs",["devclean","devlint"], function(){

	return gulp.src("src/js/**/*.js")
	.pipe(gulp.dest("public/js"));

});

gulp.task("devinjectjs",["devjs"], function(){

	var jsStream = gulp.src("public/**/*.js",{ignorePath:"public",addRootSlash: false})

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(jsStream,{ignorePath:"public",addRootSlash: false}))
  		.pipe(gulp.dest("./bin/views"));	
});

gulp.task("devinjectcss",["devcss"], function(){

	var cssStream = gulp.src("public/**/*.css",{ignorePath:"public",addRootSlash: false})

	return gulp.src("./bin/views/layout.jade")
  		.pipe(inject(cssStream,{ignorePath:"public",addRootSlash: false}))
  		.pipe(gulp.dest("./bin/views"));	
});


gulp.task("watch",function(callback){
	gulp.watch("src/**/*.html",["devpartials"]);
	gulp.watch("src/**/*.js",["devattire","devinjectjs"]);
	gulp.watch("src/css/**/*.css",["devinjectcss"]);
	callback();
});

gulp.task("synchronise", function() {
	return browsersync.init(null, {
		proxy: "http://localhost:5001",
        files: ["src/**/*.*","./bin/views/*.jade"],
        browser: "google chrome",
        port: 7000,
	});
});


gulp.task("devCopyFiles",["devfavicon","devattire","devpartials","devimages","devfonts","devcss","devjs","devinjectjs","devinjectcss"]);

gulp.task("devbuild",["devCopyFiles"]);
