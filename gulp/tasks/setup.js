var gulp = require("gulp");
var runSequence = require("run-sequence");


gulp.task("setup", function(callback) {
  	runSequence("database-start","loaddata", "database-stop", callback);
});
