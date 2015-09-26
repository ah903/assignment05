var gulp = require("gulp");
var clean = require("del");
var inject = require("gulp-inject");

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

gulp.task("devjs",["devclean"], function(){

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

gulp.task("devCopyFiles",["devfavicon","devattire","devpartials","devimages","devfonts","devcss","devjs","devinjectjs","devinjectcss"]);

gulp.task("devbuild",["devCopyFiles"]);
