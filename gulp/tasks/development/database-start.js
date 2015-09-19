//////////////////////////////////////////////////////////////////
// Gulp Task Database
// Start Mongo Server listening on default port
//////////////////////////////////////////////////////////////////
// Dependencies : None 
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var exec = require("child_process").exec;

gulp.task("database-start", function (callback) {
  exec("mongod --dbpath ./data", function (err, stdout, stderr) {
    console.log("database startup: " + stdout);
    console.log("database error: " + stderr);
    console.log("error :" + err);
    callback(err);
  });
})