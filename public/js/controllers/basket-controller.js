///////////////////////////////////////////////////////////////////////////////////////////
// Basket Controller
///////////////////////////////////////////////////////////////////////////////////////////
// Manages the data that is presented to the view and provides interaction points
// To Back end service functionality. Attached to attire-app module. Uses Minification
// Safe Injection mechanism
///////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// $scope
///////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app").controller("BasketController", ["$scope","BasketFactory", function($scope,BasketFactory){
    console.log("Basket Controller");
    var currentBasket=BasketFactory.getBasket();
    $scope.Total=currentBasket.total;

}]);
