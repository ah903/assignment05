// Required Dependencies 
var mongoose = require("mongoose");

// Create a schema for orders and map to a collection. By convention Mongoose applies 
// the pluarl form of a noun so Order maps to the Orders collection. Here we make explicit
var orderSchema = new mongoose.Schema({
	username	 : {type : Schema.Types.ObjectId},
	basket		 : String,
	billingaddr	 : 
	{
		streetname 	: {type: String, required : true}, 
		town 		: {type: String, required : true},
		city		: {type: String, required : true},
		postcode 	: {type: String, required : true},
		telephone 	: {type: String}
	}
	shippingaddr : 
	{
		streetname 	: {type: String, required : true}, 
		town 		: {type: String, required : true},
		city		: {type: String, required : true},
		postcode 	: {type: String, required : true},
		telephone 	: {type: String}
	}

}, {collection:"orders"});

// Create the data model that will interact with the database. This
// represents the underlying database collection and associates the
// Order model with the OrderSchema which is mapped to the 
// orders database collection
var orderModel = mongoose.model("Order",orderSchema);

// Make the Review Model avaialble to the rest of the server by exporting
// from the module
module.exports = orderModel;