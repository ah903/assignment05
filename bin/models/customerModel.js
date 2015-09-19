/////////////////////////////////////////////////////////////////////////////////////////////////
// CustomerModel 
/////////////////////////////////////////////////////////////////////////////////////////////////
// Defines the data schema for the customers document collection
// Exports a mongoose model capable of intercating with the database
// using the schema to control data
/////////////////////////////////////////////////////////////////////////////////////////////////
// Required Dependencies 
/////////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require("mongoose");

/////////////////////////////////////////////////////////////////////////////////////////////////
// Create a schema for custimers and map to a collection. By convention 
// Mongoose applies the pluarl form of a noun so Customer maps to the 
// Custiomers collection. Here we make this explicit
/////////////////////////////////////////////////////////////////////////////////////////////////
var customerSchema = new mongoose.Schema({
	
	username	:   {type : String, required : true, index: true}, 
	password	:   {type : String, required : true}, 
	name		: 	{type : String, required : true, index: true},					
	address		: 	
	{
		streetname 	: {type: String, required : true}, 
		town 		: {type: String, required : false},
		city		: {type: String, required : true},
		postcode 	: {type: String, required : true},
		telephone 	: {type: String}
	}, 
	card		: 	
	{
		cardtype	: {type: String, enum: ["Mastercard", "Amex", "Visa"]},
		cardnumber	: {type: String, required : false},
		expirydate	: {type: Date  , required : false},
		cvcode		: {type: Number, required : false} 		
	}			  

}, {collection:"customers"});

/////////////////////////////////////////////////////////////////////////////////////////////////
// Create the data model that will interact with the database. This
// represents the underlying database collection and associates the
// Review model with the ReviewSchema which is mapped to the 
// reviews database collection
/////////////////////////////////////////////////////////////////////////////////////////////////
module.exports  = mongoose.model("Customer",customerSchema);
