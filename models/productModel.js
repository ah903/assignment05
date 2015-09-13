/////////////////////////////////////////////////////////////////////////////////////////////////
// ProductsModel 
/////////////////////////////////////////////////////////////////////////////////////////////////
// Defines the data schema for the products document collection
// Exports a mongoose model capable of intercating with the database
// using the schema to control data
/////////////////////////////////////////////////////////////////////////////////////////////////
// Required Dependencies 
/////////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require("mongoose");

/////////////////////////////////////////////////////////////////////////////////////////////////
// Create a schema for the products catalogue and map to a collection
// By convention Mongoose applies the pluarl form of a noun so Product
// maps to the Products collection. Here we make this explicit
/////////////////////////////////////////////////////////////////////////////////////////////////
var productSchema = new mongoose.Schema({
	productId	: {type : String, required  : true, index: true },		// Product Catalog Id
	title 		: {type : String, required  : true, index: true },		// Product Title
	description : {type : String, required  : true},					// Product Description
	brand		: {type : String, index: true},							// Product Brand
	category 	: {type : String, required  : true, index: true },		// Product Category e.g. Swinwear	
	group 		: {type : String, required  : true, index: true },		// Product Group e.g. Menswear
	campaign 	: {type : String, required  : false},					// Product Marketing Campaign
	price 		: {type : String, required  : true},					// Product Price
	stock 		: {type : Number, required  : true},					// Units In Stock
	promotion 	: {type : String, required  : true, index: true },		// Promotion Description
	colors		: {type : Array , default : []},						// Product Available Colors
	sizes		: {type : Array , default : []},						// Product Available Sizes
	pictures	: 
	{
		large	: {type : String},										// Product Imagery
		medium	: {type : String},										// Product Imagery
		small	: {type : String},										// Product Imagery
		thumb	: {type : String},										// Product Imagery
		front	: {type : String},										// Product Imagery
		back	: {type : String},										// Product Imagery
		model1	: {type : String},										// Product Imagery
		model2	: {type : String}										// Product Imagery
	},						
	related		: {type : Array , default : []},						// Related Products

}, {collection:"products"});

/////////////////////////////////////////////////////////////////////////////////////////////////
// Create the data model that will interact with the database. This
// represents the underlying database collection and associates the
// Product model with the ProductSchema which is mapped to the 
// products database collection
/////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = mongoose.model("Product",productSchema);

