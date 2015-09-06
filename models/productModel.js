// Required Dependencies 
var mongoose = require("mongoose");


// Create a schema for the products catalogue and map to a collection
// By convention Mongoose applies the pluarl form of a noun so Product
// maps to the Products collection. Here we make this explicit
var productSchema = new mongoose.Schema({
	productId	: {type : String, required  : true, index: true },		// Product Catalog Id
	title 		: {type : String, required  : true, index: true },		// Product Title
	description : {type : String, required  : true},					// Product Description
	brand		: {type : String, index: true},							// Product Brand
	category 	: {type : String, required  : true, index: true },		// Product Category e.g. Swinwear	
	group 		: {type : String, required  : true, index: true },		// Product Group e.g. Menswear
	campaign 	: {type : String, required  : false},					// Product Marketing Campaign
	price 		: {type : Number, required  : true},					// Product Price
	stock 		: {type : Number, required  : true},					// Units In Stock
	promotion 	: {type : String, required  : true, index: true },		// Promotion Description
	colors		: {type : Array , default : []},						// Product Available Colors
	sizes		: {type : Array , default : []},						// Product Available Sizes
	pictures	: {type : Array , default : []},						// Product Imagery
	related		: {type : Array , default : []},						// Related Products

}, {collection:"products"});


// Create the data model that will interact with the database. This
// represents the underlying database collection and associates the
// Product model with the ProductSchema which is mapped to the 
// products database collection
var productModel = mongoose.model("Product",productSchema);

// Make the Product Model avaialble to the rest of the server by exporting
// from the module
module.exports = productModel;