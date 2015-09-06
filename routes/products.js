// Required Dependencies 
var express = require("express");
var router = express.Router();
var productModel = require("../models/productModel");
var reviewModel = require("../models/reviewModel");


// API GET products mounted at /products
router.get("/", function(req, res, next) {

  	console.log("Received GET Request All Products");
 	console.log("Group " + req.query.group);
 	console.log("Category " + req.query.category);

 	// Create a Search Query
  	// Note this could potentially done in the pipeline
  	var query={};
  	if(req.query.group) query.group=req.query.group;
  	if(req.query.category) query.category=req.query.category;  

  	productModel.find(query,function(err,data){
  		if(err) next(err);
		res.status(200).json(data);
  	});
});


// API GET single product by productid (Note not the Mongo ObjectId)
router.get("/:productId", function(req, res, next) {

  	console.log("Received GET Request Products By Id " + req.params.productId);
  	productModel.find({productId:req.params.productId},function(err,data){
  		if(err) next(err);
		res.status(200).json(data);
  	});
});


// API GET reviews for a specific productid (Note not the Mongo ObjectId)
router.get("/:productId/reviews", function(req, res, next) {

  	console.log("Received GET Request Reviews for Product Id " + req.params.productId);

  	// Create Query and Sort Options For The Database Filter
  	var query={}, sortOptions={};

  	query.productId = req.params.productId;
  	sortOptions.sort={posted:1};

  	reviewModel.find(query).sort({posted:1}).exec(function(err, data){
  		if(err) next(err);
  		res.status(200).json(data);		
  	});
});


// API POST reviews for a specific productid (Note not the Mongo ObjectId)
// Sends Back HTTP 201 Indicated Resource Created Successfully
router.post("/:productId/reviews", function(req, res, next) {

  	console.log("Received POST Request Review for Product Id " + req.params.productId);

  	var newReview = new reviewModel();
	newReview.productId = req.params.productId;
	newReview.reviewer = req.body.reviewer;
	newReview.title = req.body.title;
	newReview.body = req.body.body;
	newReview.rating = req.body.rating;
	console.log(newReview);
	newReview.save(function(err, data){
		if(err) next(err);
		res.status(201).json(data);				
	});

});


module.exports = router;
