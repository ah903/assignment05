/////////////////////////////////////////////////////////////////////////////////////////////////
// OrderModel 
/////////////////////////////////////////////////////////////////////////////////////////////////
// Defines the data schema for the orders document collection
// Exports a mongoose model capable of intercating with the database
// using the schema to control data
/////////////////////////////////////////////////////////////////////////////////////////////////
// Required Dependencies 
/////////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require("mongoose");

/////////////////////////////////////////////////////////////////////////////////////////////////
// Create a schema for orders and map to a collection. By convention Mongoose applies 
// the pluarl form of a noun so Order maps to the Orders collection. Here we make explicit
/////////////////////////////////////////////////////////////////////////////////////////////////
var orderSchema = new mongoose.Schema({
	customer 	: {type : mongoose.Schema.ObjectId, ref:"Customer"},
	ordercount	: {type: Number, required : true, default:0, min:0},
	ordertotal	: {type: Number, required : true, default:0, min:0},
	orderstatus	: {type: String, required : true, default: "Order Placed"},
	orderitems	: 
	[
		{
			productId	: {type: String, required : true},
			price		: {type: Number, required : true, default:0, min:0},
			quantity	: {type: Number, required : true, default:0, min:0},
			subtotal	: {type: Number, required : true, default:0, min:0}	
		}
	],		
	delivery 	:
	{
		deliverytype	: {type: String, enum: ["Collect", "Standard", "Express"]},
		deliverycode	: {type: Number, required : true, default:0, min:0},
		shippingdate	: {type: Date, required : true, default: Date.now()+5*24*60*60*1000},	
	},
	billingaddr	: 
	{
		streetname 	: {type: String, required : true}, 
		town 		: {type: String, required : true},
		city		: {type: String, required : true},
		postcode 	: {type: String, required : true},
		telephone 	: {type: String}
	},
	shippingaddr: 
	{
		streetname 	: {type: String, required : true}, 
		town 		: {type: String, required : true},
		city		: {type: String, required : true},
		postcode 	: {type: String, required : true},
		telephone 	: {type: String}
	}

}, {collection:"orders"});

/////////////////////////////////////////////////////////////////////////////////////////////////
// Create the data model that will interact with the database. This
// represents the underlying database collection and associates the
// Order model with the OrderSchema which is mapped to the 
// orders database collection
/////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = mongoose.model("Order",orderSchema);



