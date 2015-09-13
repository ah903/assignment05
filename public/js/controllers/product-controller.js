angular.module("attire-app").controller("product-controller", function($scope, $routeParams, $location, $rootScope, DataFactory){
    
    DataFactory.getProducts($routeParams.group,$routeParams.category)
      .success(function(response){
      $scope.products=response;
    });

    //$scope.ViewProduct=function(product){
    // 	$rootScope.CurrentProduct = product;
    //	$location.url("/detail");
    //}

    $scope.ViewProduct=function(product){
    	
    	DataFactory.getReviews(product)
    	  .success(function(reviewsForProduct){
      	  product.reviews=reviewsForProduct;
     	  $rootScope.CurrentProduct = product;
    	  $location.url("/detail");
    	});
    };

});