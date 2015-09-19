///////////////////////////////////////////////////////////////////////////////////////////////////
// Product Factory 
// Singleton Factory Responsible for managing connection to backend database
// Follows a pattern of using $http object to connect to an API endpoint
// and post processing the promise with the .then construct to make it simpler
// for consuming controllers
///////////////////////////////////////////////////////////////////////////////////////////////////
// This pattern is also useful to hide physical data storage implementations
// from controllers so a controller may make a single call to the factory and
// not need to know that the factory may chain multiple promises to assemble
// the data requested
///////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// $http injected in
///////////////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app").factory("ProductFactory",["$http", function($http){

	/////////////////////////////////////////////////////////////////////////
	// Private Variables
	/////////////////////////////////////////////////////////////////////////
	var BASE_API_ENDPOINT="/api/products/";
	var URLQTOKEN="?";
	var URLATOKEN="&";

	/////////////////////////////////////////////////////////////////////////
	// Function getProductsForGroupCategory
	/////////////////////////////////////////////////////////////////////////
	// Gets a list of products for a given group and category
	// Post Processes the $http promise to return the data
	/////////////////////////////////////////////////////////////////////////
	// Returns Promise	
	/////////////////////////////////////////////////////////////////////////
	var getProductsForGroupCategory = function(group,category){
		
		var serviceEndpoint = BASE_API_ENDPOINT + "?group=" + group + "&category=" + category;

		var promise = $http.get(serviceEndpoint);
		promise.then(function(results) {
    		return results.data;
    	});
    	return promise;

	};

	/////////////////////////////////////////////////////////////////////////
	// Function getProductById
	/////////////////////////////////////////////////////////////////////////
	// Gets a distinct single product based on its unique productId
	// Post Processes the $http promise to add reveiws 
	// and return the data	
	/////////////////////////////////////////////////////////////////////////
	// Returns Promise
	/////////////////////////////////////////////////////////////////////////
	var getProductById = function(productId){
		
		var productEndpoint = BASE_API_ENDPOINT + productId;
		var reviewsEndpoint = BASE_API_ENDPOINT + productId + "/reviews";
		var currentProduct  = null;

		return $http.get(productEndpoint).then(function(productQueryResult) {
  			currentProduct=productQueryResult.data;
  			return $http.get(reviewsEndpoint);
		}).then(function(reviewQueryResult) {
  			currentProduct.reviews=reviewQueryResult.data;
  			return currentProduct;
		});

	};


	/////////////////////////////////////////////////////////////////////////
	// Public Interface to the Factory Exposed as an Object literal
	// Set of pointers to private functions
	/////////////////////////////////////////////////////////////////////////
	return{
		getProductsForGroupCategory:getProductsForGroupCategory,
		getProductById:getProductById
	};

}]);