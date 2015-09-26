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
angular.module("attire-app").controller("BasketController", ["$scope","$rootScope","BasketFactory", function($scope,$rootScope,BasketFactory){
   

    $rootScope.$on("OnBasketChanged",loadBasket);
    loadBasket();

    function loadBasket(){
	    $scope.Basket=BasketFactory.getBasket();
    }

    $scope.updateBasket = function(basketItem){
    	BasketFactory.updateBasket(basketItem);
    };

     $scope.removeFromBasket = function(basketItem){
    	BasketFactory.removeFromBasket(basketItem);
    };

}]);
