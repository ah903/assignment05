//////////////////////////////////////////////////////////////////
// Gulp Task LoadData
// Run data import files to create a test data set in Mongo
// Optionally drop existing collections
// Loads Products, Reviews, Customers
//////////////////////////////////////////////////////////////////
// Dependencies : database
//////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var exec = require("child_process").exec;

gulp.task("loaddata", function (callback) {
  

	//Import Product Test Data
	exec(createImportCommand("./bin/testdata/generation-02/product-100-out.json","products",true),function(err, stdout, stderr){
    	console.log(stdout);
    	console.log(stderr);
	});
    
	exec(createImportCommand("./bin/testdata/generation-02/product-200-out.json","products",false),function(err, stdout, stderr){
    	console.log(stdout);
    	console.log(stderr);
	});
	exec(createImportCommand("./bin/testdata/generation-02/product-300-out.json","products",false),function(err, stdout, stderr){
    	console.log(stdout);
    	console.log(stderr);
	});
	exec(createImportCommand("./bin/testdata/generation-02/product-400-out.json","products",false),function(err, stdout, stderr){
    	console.log(stdout);
    	console.log(stderr);
	});

	//Import Product Test Data
	exec(createImportCommand("./bin/testdata/generation-02/review-100-out.json","reviews",true),function(err, stdout, stderr){
 		console.log(stdout);
    	console.log(stderr);
	});
	exec(createImportCommand("./bin/testdata/generation-02/review-200-out.json","reviews",false),function(err, stdout, stderr){
 		console.log(stdout);
    	console.log(stderr);	
	});
	exec(createImportCommand("./bin/testdata/generation-02/review-300-out.json","reviews",false),function(err, stdout, stderr){
 		console.log(stdout);
    	console.log(stderr);
	});
	exec(createImportCommand("./bin/testdata/generation-02/review-400-out.json","reviews",false),function(err, stdout, stderr){
 		console.log(stdout);
    	console.log(stderr);
	});
	exec(createImportCommand("./bin/testdata/generation-02/review-500-out.json","reviews",false),function(err, stdout, stderr){
 		console.log(stdout);
    	console.log(stderr);
	});
	exec(createImportCommand("./bin/testdata/generation-02/review-600-out.json","reviews",false),function(err, stdout, stderr){
 		console.log(stdout);
    	console.log(stderr);
	});
	exec(createImportCommand("./bin/testdata/generation-02/review-700-out.json","reviews",false),function(err, stdout, stderr){
 		console.log(stdout);
    	console.log(stderr);
	});
	exec(createImportCommand("./bin/testdata/generation-02/review-800-out.json","reviews",false),function(err, stdout, stderr){
 		console.log(stdout);
    	console.log(stderr);	
	});
	
    // Import Customer Data
    exec(createImportCommand("./bin/testdata/generation-02/customer-100-out.json","customer",true),function(err, stdout, stderr){
 		console.log(stdout);
     	console.log(stderr);
     	// Important : Signal That the Process is completed
     	callback(null);
	});

  
    function createImportCommand(filename, collection, dropCollection){
    	
    	//var importConfig = {
    	//	host : "127.0.0.1",
    	//	port : "27017",
    	//	dbns : "attire-db0-dev"	
    	//};

   		var importConfig = {
    		host : "ds051873.mongolab.com",
    		port : "51873",
    		dbns : "heroku_hl48jg51",	
    		user : "'att1re'",
    		pswd : "'att1re'"
    	};


    	var command = "mongoimport --jsonArray --host " + importConfig.host;
    	command += " --port " + importConfig.port;
    	command += " --db " + importConfig.dbns;	
		command += " --collection " + collection;	
		command += " --file " + filename;
		if(importConfig.user) command += " -u " + importConfig.user;
		if(importConfig.pswd) command += " -p " + importConfig.pswd;
		if(dropCollection)
			command += " --drop";
		
		console.log(command);
		return command;
    };

});

