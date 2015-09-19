//////////////////////////////////////////////////////////////////
// Gulp Task Database Stop
// Start Mongo Database Server
//////////////////////////////////////////////////////////////////
// Dependencies : build 
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var exec = require("child_process").exec;

gulp.task("database-stop", function (callback) {
  exec("mongo admin --eval 'db.shutdownServer()';", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
})

