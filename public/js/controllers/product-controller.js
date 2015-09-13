angular.module("attire-app").controller("product-controller", function($scope, $routeParams, $location, $rootScope, DataFactory){
    
    var currentProduct;
    
    DataFactory.getProducts($routeParams.group,$routeParams.category)
      .success(function(response){
      $scope.products=response;
    });

    //$scope.GetProduct=function(product){
    // 	$rootScope.CurrentProduct = product;
    //	$location.url("/detail");
    //}

	//$scope.GetProduct=function(product){
    // 	DataFactory.getProduct(product)
    // 	.success(function(productDetail){
    // 		$rootScope.CurrentProduct=productDetail;
    // 		$location.url("/detail");		
    // 	})
    //} 

    $scope.GetProduct=function(product){
    	var g = getProduct(product)
    	.success(function(item){
    		currentProduct=item;
    		var h = getReviews(currentProduct)
	    		.success(function(reviews){
	    		currentProduct.reviews=reviews;
	    		$rootScope.CurrentProduct=currentProduct;
	     		$location.url("/detail");	
	    	});
	    })
    	
    };

    var getProduct=function(product){
    	return DataFactory.getProduct(product);
    }
    var getReviews=function(product){
    	return DataFactory.getReviews(product);
    }

    $scope.GetReviews=function(product){	
    	DataFactory.getReviews(product)
    	  .success(function(reviewsForProduct){
     	  product.reviews=reviewsForProduct;
     	  $rootScope.CurrentProduct = product;
    	  $location.url("/detail");
    	});
    };

});