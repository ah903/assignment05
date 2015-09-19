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
// API : POST customers/login
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Logs the user in by checking the username and password match a record in the database
// If a match is found the registerd user is returned
// If no match is found an error is generated
/////////////////////////////////////////////////////////////////////////////////////////////////
// Returns HTTP 201 Success
//         HTTP 404 Resource Not Found
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/login", function(req, res, next) {

    console.log("Received POST Request for Customer Login");

    var usernameFromBody = req.body.username;
    var passwordFromBody = req.body.password;

    customerModel.findOne({username:usernameFromBody,password:passwordFromBody},function(err,data){
      if(err) return res.status(404).json(err);
      res.status(200).json(data);
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// API : POST customers/register
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Registers a new user as a customer of the system and allocates an object Id
/////////////////////////////////////////////////////////////////////////////////////////////////
// Returns HTTP 201 Success
//         HTTP 404 Resource Not Found
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/register", function(req, res, next){

    console.log("Received POST for new customer registration");

    var registeredUser = new customerModel();
    registeredUser.username=req.body.username;
    registeredUser.password=req.body.password;
    registeredUser.name=req.body.name;
    registeredUser.address = {};
    registeredUser.address.streetname = req.body.address.streetname || "" ;
    registeredUser.address.town = req.body.address.town || "";
    registeredUser.address.city = req.body.address.city || "";
    registeredUser.address.postcode = req.body.address.postcode || "";
    registeredUser.address.telephone = req.body.address.telephone || "";

    registeredUser.save(function(err, data){
      if(err) return res.status(404).json(err);
      res.status(201).json(data);
    }); 

});


/////////////////////////////////////////////////////////////////////////////////////////////////
// API : PUT customers/register
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Updates an existing customer registration 
/////////////////////////////////////////////////////////////////////////////////////////////////
// Returns HTTP 201 Success
//         HTTP 404 Resource Not Found
/////////////////////////////////////////////////////////////////////////////////////////////////
router.put("/register", function(req, res, next){

    console.log("Received PUT for new customer registration");

    var registeredUser = req.body;
    var query = {_id:registeredUser._id};
    var options = {upsert:true, new:true};

    customerModel.findOneAndUpdate(query,registeredUser,options, function(err,data){
      if(err) return res.status(404).json(err);
      res.status(201).json(data);
    });
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
