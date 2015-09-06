/////////////////////////////////////////////////////////////////////////////////////////////////
// Products Middleware
/////////////////////////////////////////////////////////////////////////////////////////////////
// Contains all the processing endpoints for retrieving lists of products including
// support for filtering through query string parameters
// Also Uses the review Schema to expose reviews and accept user content
/////////////////////////////////////////////////////////////////////////////////////////////////
// Required Dependencies 
/////////////////////////////////////////////////////////////////////////////////////////////////
var express = require("express");
var router = express.Router();
var productModel = require("../models/productModel");
var reviewModel = require("../models/reviewModel");

/////////////////////////////////////////////////////////////////////////////////////////////////
// API : GET /products
// API : GET /products/?group=groupName
// API : GET /products/?category=categoryName
// API : GET /products/?group=groupName&category=categoryName
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Returns all documents in the products collection with optional Filters
// Group 	: Name of the Product Group
// category : Name of the Product Category
// TO DO    : Sort Order limits and Pagination
/////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/", function(req, res, next) {

  	console.log("Received GET Request All Products");
 	console.log("Group " + req.query.group);
 	console.log("Category " + req.query.category);

 	/////////////////////////////////////////////////////////////////
 	// Create a Search Query
  	// Note this could potentially done in the pipeline with app
  	// params if we need to achieve reusable support for these
  	// filters
  	/////////////////////////////////////////////////////////////////
  	var query={};
  	if(req.query.group) query.group=req.query.group;
  	if(req.query.category) query.category=req.query.category;  
  	
  	// Execute the database query and return a 200 if successful
  	productModel.find(query,function(err,data){
  		if(err) next(err);
  		if(!data) next();
		res.status(200).json(data);
  	});
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// API : GET /products/123456789
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Returns a single product document from the collection queried by the productId
// (Note not the Mongo ObjectId)
/////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/:productId", function(req, res, next) {

  	console.log("Received GET Request Products By Id " + req.params.productId);
  	
  	/////////////////////////////////////////////////////////////////
  	// Execute the database query and return a 200 if successful
  	/////////////////////////////////////////////////////////////////
  	productModel.find({productId:req.params.productId},function(err,data){
  		if(err) next(err);
  		if(!data) next();
		res.status(200).json(data);
  	});
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// API : GET /products/123456789/reviews
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Returns all the reviews for a specified product identified by its productid 
// (Note not the Mongo ObjectId)
// TO DO    : Sort Order limits and Pagination
/////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/:productId/reviews", function(req, res, next) {

  	console.log("Received GET Request Reviews for Product Id " + req.params.productId);

  	/////////////////////////////////////////////////////////////////
  	// Create Query and Sort Options For The Database Filter
  	/////////////////////////////////////////////////////////////////
  	var query={}, sortOptions={};

  	query.productId = req.params.productId;
  	sortOptions.sort={posted:1};

  	/////////////////////////////////////////////////////////////////
  	// Execute the database query and return a 200 if successful
  	/////////////////////////////////////////////////////////////////
  	reviewModel.find(query).sort({posted:1}).exec(function(err, data){
  		if(err) next(err);
  		if(!data) next();
  		res.status(200).json(data);		
  	});
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// API : GET /products/123456789/reviews/5d334ea33bb31cff
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Returns single review with for a specific productid, identified by the review Id 
/////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/:productId/reviews/:reviewId", function(req, res, next) {

  	console.log("Received GET Request Review with Review Id for Product Id " + req.params.productId);

  	/////////////////////////////////////////////////////////////////
  	// Create Query and Sort Options For The Database Filter
  	/////////////////////////////////////////////////////////////////
  	var query={}, sortOptions={};

  	query.productId = req.params.productId;
  	query._id = req.params.reviewId;
  	console.log(query);
  	sortOptions.sort={posted:1};

  	/////////////////////////////////////////////////////////////////
  	// Execute the database query and return a 200 if successful
  	/////////////////////////////////////////////////////////////////
  	reviewModel.find(query).sort({posted:1}).exec(function(err, data){
  		if(err) next(err); 
  		if(!data) next();
  		res.status(200).json(data);		
  	});
});


/////////////////////////////////////////////////////////////////////////////////////////////////
// API : POST /products/123456789/reviews
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Ctreates a new review for a specific product specific by the roductid 
// (Note not the Mongo ObjectId)
// Sends Back HTTP 201 Indicated Resource Created Successfully
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/:productId/reviews", function(req, res, next) {

  	console.log("Received POST Request Review for Product Id " + req.params.productId);

  	var newReview = new reviewModel();
	newReview.productId = req.params.productId;
	newReview.reviewer = req.body.reviewer;
	newReview.title = req.body.title;
	newReview.body = req.body.body;
	newReview.rating = req.body.rating;
	
	/////////////////////////////////////////////////////////////////
	// Save the Review and Return 201 Code If Successful
	/////////////////////////////////////////////////////////////////
	newReview.save(function(err, data){
		if(err) next(err);
		if(!data) next();
		res.status(201).json(data);				
	});

});

/////////////////////////////////////////////////////////////////////////////////////////////////
// API : DELETE /products/123456789/reviews/5d334ea33bb31cff
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Deletes a review for a specific product identified by the object id 
// Sends Back HTTP 204 Indicated Resource Deleted Successfully.
// Does not return any resource if deleted successfully
/////////////////////////////////////////////////////////////////////////////////////////////////
router.delete("/:productId/reviews/:reviewId", function(req, res, next) {

  	console.log("Received DELETE Request Review Id " + req.params.reviewId);
  	var query = {};
  	query._id=req.params.reviewId;

  	/////////////////////////////////////////////////////////////////
	// Delete the Review and Return 204 Code If Successful
	/////////////////////////////////////////////////////////////////
  	reviewModel.remove(query,function(err, data){
  		if(err) next(err);
		res.status(204).send();	
  	});
});

module.exports = router;
