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
var orderModel = require("../models/orderModel");


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

/////////////////////////////////////////////////////////////////////////////////////////////////
// API : GET /customer/123456789
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Returns a single customer document from the collection queried by the _id
/////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/:customerId", function(req, res, next) {

    console.log("Received GET Request Customer By Id " + req.params.customerId);
    
    /////////////////////////////////////////////////////////////////
    // Execute the database query and get the requested custome
    /////////////////////////////////////////////////////////////////
    customerModel.findById(req.params.customerId, function(err,data){
        if(err) next(err); if(!data) next();
        res.status(200).json(data);
    })

});

/////////////////////////////////////////////////////////////////////////////////////////////////
// API : GET /customer/123456789/orders
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Returns the orders placed by a single customer queried by the _id
/////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/:customerId/orders", function(req, res, next) {

    console.log("Received GET Request Orders for Customer With Id " + req.params.customerId);
    
    /////////////////////////////////////////////////////////////////
    // Execute the database query and get the requested custome
    /////////////////////////////////////////////////////////////////
    var query = {customer: req.params.customerId};
    orderModel.find(query, function(err,data){
      if(err) next(err); if(!data) next();
      res.status(200).json(data);
    });

});

/////////////////////////////////////////////////////////////////////////////////////////////////
// API : GET /customer/123456789/orders
/////////////////////////////////////////////////////////////////////////////////////////////////
// Description
// Returns the orders placed by a single customer queried by the _id
/////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/:customerId/orders", function(req, res, next) {

    console.log("Received POST Request New Order for Customer With Id " + req.params.customerId);
    
    /////////////////////////////////////////////////////////////////
    // Execute the database query and get the requested custome
    /////////////////////////////////////////////////////////////////
    var basket = req.body;
    
    var newOrder = new orderModel();
    newOrder.customer = basket.user._id;
    newOrder.ordercount = basket.count;
    newOrder.ordertotal = basket.total;
    newOrder.orderitems = parseProducts(basket);
    newOrder.payment = parsePayment(basket);
    newOrder.billingaddr = parseAddress(basket.user); 
    newOrder.shippingaddr = parseAddress(basket.user);
    newOrder.delivery = parseDelivery(basket);

    /////////////////////////////////////////////////////////////////
    // Save the Review and Return 201 Code If Successful
    /////////////////////////////////////////////////////////////////
    newOrder.save(function(err, data){
      if(err) next(err);
      if(!data) next();
      res.status(201).json(data);       
   });
    
});

function parseProducts(basket){

  var orderedProducts = [];
  for(var i=0; i < basket.items.length; i++){
      var orderItem = {};
      orderItem.productId = basket.items[i].product._id;
      orderItem.price = basket.items[i].price;
      orderItem.quantity = basket.items[i].quantity;
      orderItem.subtotal = basket.items[i].subTotal;
      orderItem.size = basket.items[i].productOptions.sizeOption;
      orderItem.color = basket.items[i].productOptions.colorOption;
      orderedProducts.push(orderItem);
  }
  return orderedProducts;

}

function parsePayment(basket){

    var transaction = {};
    transaction.cardtype = basket.payment.cardType;
    transaction.cardnumber = basket.payment.cardNumber;
    transaction.expirydate = basket.payment.cardExpiry;
    transaction.cardCV = basket.payment.cardCV;  
    return transaction;  
}

function parseDelivery(basket){

    var delivery = {};
    delivery.deliveryType="Standard";
    delivery.shippingdate=Date.now()+5*24*60*60*1000;
    return delivery;
}

function parseAddress(customer){

    var address=customer.address;
    return address;
}



module.exports = router;
