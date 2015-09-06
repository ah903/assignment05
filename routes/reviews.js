// Required Dependencies 
var express = require("express");
var router = express.Router();
var reviewModel = require("../models/reviewModel");


// API GET reviews
router.get("/", function(req, res, next) {

  	console.log("Received GET /reviews Request");
  	res.status(200).send("Reviews");
  	//reviewModel.find().sort({title:1}).exec(function(err,data){
	//	if(err) console.log(err);
	//	res.status(200).json(data);
	//});
});


module.exports = router;
