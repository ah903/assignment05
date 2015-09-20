//////////////////////////////////////////////////////////////////
// Gulp Task Database
// Start Mongo Server listening on default port
//////////////////////////////////////////////////////////////////
// Dependencies : None 
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var exec = require("child_process").exec;
var mongo= require("mongodb").MongoClient, assert = require('assert');

gulp.task("database-start", function (callback) {
  
    var attempts = 0;
  	checkServer();
  	var timer = setInterval(checkServer,1000)
	
  	function startServer(){
  		attempts++;
  		exec("mongod --dbpath ./data");
	  }

	function checkServer(){
		
    if(attempts > 3){
			clearTimeout(timer);
			callback("Data Base Server Not Running");
		}
        mongo.connect('mongodb://localhost:27017/attire-db0-dev', function (error, database) {
            if (error) {
            	console.log(error);
                startServer();
            } else {
                console.log("Database Server is Running");
                clearTimeout(timer);
                callback();
            }
        });
	}
})


