// Required Dependencies 
var express = require("express");
var router = express.Router();

// API GET home page
router.get("/", function(req, res, next) {

	console.log("Received GET Root Request");
	res.render("newindex", { title: "Express" });

});

module.exports = router;
