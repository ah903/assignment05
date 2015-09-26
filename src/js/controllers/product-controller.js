///////////////////////////////////////////////////////////////////////////////////////////
// Product Controller
///////////////////////////////////////////////////////////////////////////////////////////
// Manages the data that is presented to the view and provides interaction points
// To Back end service functionality. Attached to attire-app module. Uses Minification
// Safe Injection mechanism
///////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// $scope, $routeParams, $location, $routeScope, ProductFactory
///////////////////////////////////////////////////////////////////////////////////////////

angular.module("attire-app").controller("ProductController", ["$scope","$routeParams","ProductFactory",function($scope, $routeParams,ProductFactory){

	
	///////////////////////////////////////////////////////////////////////////
	// Initial View - Load Data When Controller Is Instantiated
	///////////////////////////////////////////////////////////////////////////
	var promise=ProductFactory.getProductsForGroupCategory($routeParams.group,$routeParams.category);
	promise.success(function(response){
		$scope.products=response;
	});


}]);