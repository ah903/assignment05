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

angular.module("attire-app").controller("ProductController", function($scope, $routeParams, $location, $rootScope, ProductFactory){

	var promise=ProductFactory.getProductsForGroupCategory($routeParams.group,$routeParams.category);
	promise.success(function(response){
		$scope.products=response;
	});

	$scope.GetProduct=function(product){
		ProductFactory.getProductById(product.productId).then(function(response){
			$scope.CurrentProduct=response;	
			$rootScope.CurrentProduct=response;
	    	$location.url("/detail");		
		})
	};

});
ProductController.$inject = ["$scope","$routeParams","$location","$rootScope","ProductFactory"];

