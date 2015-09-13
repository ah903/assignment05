angular.module("attire-app").controller("product-controller", function($scope, $routeParams, $location, $rootScope, DataFactory){
    
    //$rootScope.CurrentProduct=null;

    DataFactory.getProducts($routeParams.group,$routeParams.category)
      .success(function(response){
      $scope.products=response;
    });

    $scope.ViewProduct=function(product){
    	console.log(product);
    	$rootScope.CurrentProduct = product;
    	$location.url("/detail");
    }

});