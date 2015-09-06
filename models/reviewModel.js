/////////////////////////////////////////////////////////////////////////////////////////////////
// ReviewModel 
/////////////////////////////////////////////////////////////////////////////////////////////////
// Defines the data schema for the reviewss document collection
// Exports a mongoose model capable of intercating with the database
// using the schema to control data
/////////////////////////////////////////////////////////////////////////////////////////////////
// Required Dependencies 
/////////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require("mongoose");

/////////////////////////////////////////////////////////////////////////////////////////////////
// Create a schema for product reviews and map to a collection
// By convention Mongoose applies the pluarl form of a noun so Review
// maps to the Reviews collection. Here we make this explicit

// Reviews are linked to products rather than embedded on the product document
// This is more flexible and potentially easier to search and navigate. 
// However there is a downside in that Reviews now are disaccioated from 
// Mongo's document level trabnsaction scope. In this instance this is not
// important as reviews will be created after the prodict document is created
// Insert is somewhat simpler than document update 
/////////////////////////////////////////////////////////////////////////////////////////////////
var reviewSchema = new mongoose.Schema({
	//productId	: {type : mongoose.Schema.ObjectId, ref:"Product", index: true}, 	// Review for Product
	productId	: {type : String, ref:"Product", index: true},
	reviewer	: {type : String, required : true},									// Reviewer Name
	title 		: {type : String, required : true},									// Review Title
	body 		: {type : String, required : true},									// Review Text
	posted 		: {type : String, default  : Date.now},								// Date Posted	
	rating 		: {type : Number, required : true, min : 1, max : 5, index: true }	// Rating

}, {collection:"reviews"});

/////////////////////////////////////////////////////////////////////////////////////////////////
// Create the data model that will interact with the database. This
// represents the underlying database collection and associates the
// Review model with the ReviewSchema which is mapped to the 
// reviews database collection
/////////////////////////////////////////////////////////////////////////////////////////////////
var reviewModel = mongoose.model("Review",reviewSchema);

/////////////////////////////////////////////////////////////////////////////////////////////////
// Make the Review Model avaialble to the rest of the server by exporting
// from the module
/////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = reviewModel;