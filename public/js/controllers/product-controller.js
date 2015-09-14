angular.module("attire-app").controller("product-controller", function($scope, $routeParams, $location, $rootScope, ProductFactory){

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

