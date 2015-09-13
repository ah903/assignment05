angular.module("attire-app").controller("product-controller", function($scope, $routeParams, $http){
    console.log("Product Controller");
    
    var group = $routeParams.group;
    var category = $routeParams.category;
    var endpoint = "/api/products/?group=" + group + "&category=" + category;

    $http.get(endpoint)
      .success(function(response){
      $scope.products=response;
    });

    $scope.greeting="Welcome Andrew Product Controller";
});