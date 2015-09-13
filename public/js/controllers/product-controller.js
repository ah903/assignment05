angular.module("attire-app").controller("product-controller", function($scope, $routeParams, DataFactory){
    
    var group = $routeParams.group;
    var category = $routeParams.category;

    DataFactory.getProducts($routeParams.group,$routeParams.category)
      .success(function(response){
      $scope.products=response;
    });

});