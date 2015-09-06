// Required Dependencies 
var express = require("express");
var router = express.Router();
var productModel = require("../models/productModel");

// API GET products mounted at /products
router.get("/", function(req, res, next) {

  	console.log("Received GET /products Request");
  	
  	productModel.find(function(err,data){
  		if(err) console.log(err);
		res.status(200).json(data);
  	});
});


module.exports = router;
