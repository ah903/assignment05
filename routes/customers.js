/////////////////////////////////////////////////////////////////////////////////////////////////
// Customers Middleware
/////////////////////////////////////////////////////////////////////////////////////////////////
// Contains all the processing endpoints for retrieving lists of customers including
// support for filtering through query string parameters
// Also Uses the review Schema to expose reviews and accept user content
/////////////////////////////////////////////////////////////////////////////////////////////////
// Required Dependencies 
/////////////////////////////////////////////////////////////////////////////////////////////////
var express = require("express");
var router = express.Router();
var customerModel = require("../models/customerModel");


/////////////////////////////////////////////////////////////////////////////////////////////////
// API : POST /users
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Ctreates a new review for a specific product specific by the roductid 
// (Note not the Mongo ObjectId)
// Sends Back HTTP 201 Indicated Resource Created Successfully
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/login", function(req, res, next) {

    console.log("Received POST Request for User");

    var username = req.body.username;
    var password = req.body.password;

    customerModel.findOne({username:username}, function(err,data){
      if(err) next(err);
      if(!data) next();
      if(data.password==password){
        console.log("Authenticated Successsfully");
        res.status(200).json(data);
      }
    })
});


/////////////////////////////////////////////////////////////////////////////////////////////////
// API : GET /customers
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Returns all documents in the products collection with optional Filters
// Group 	: Name of the Product Group
// category : Name of the Product Category
// TO DO    : Sort Order limits and Pagination
/////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/", function(req, res, next) {

  	console.log("Received GET Request All Customers");

 	/////////////////////////////////////////////////////////////////
 	// Create a Search Query
  	// Note this could potentially done in the pipeline with app
  	// params if we need to achieve reusable support for these
  	// filters
  	/////////////////////////////////////////////////////////////////
  	var query={};
  	
  	// Execute the database query and return a 200 if successful
  	customerModel.find(query,function(err,data){
  		if(err) next(err);
  		if(!data) next();
		res.status(200).json(data);
  	});
});

module.exports = router;
