// Required Dependencies 
var express = require("express");
var router = express.Router();
var productModel = require("../models/productModel");

// API GET products meeting search criteria mounted at /serach
router.get("/", function(req, res, next) {

 	console.log("Received GET /products Request");
 	console.log("Group " + req.query.group);
 	console.log("Category " + req.query.category);
  	
  	// Create a Search Query
  	// Note this could potentially done in the pipeline
  	var query={};
  	if(req.query.group) query.group=req.query.group;
  	if(req.query.category) query.category=req.query.category;  	
  	
  	// Execute the Query
  	productModel.find(query,function(err,data){
  		if(err) console.log(err);
		res.status(200).json(data);
  	});
});

module.exports = router;
