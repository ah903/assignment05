///////////////////////////////////////////////////////////////////////////////////////////
// Order Controller
///////////////////////////////////////////////////////////////////////////////////////////
// Manages the data that is presented to the view and provides interaction points
// To Back end service functionality. Attached to attire-app module. Uses Minification
// Safe Injection mechanism
// 
///////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// $scope
///////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app").controller("OrderController", ["$scope","$rootScope","BasketFactory","OrderFactory",function($scope,$rootScope,BasketFactory,OrderFactory){

	$scope.Basket = BasketFactory.getBasket();
	$scope.Basket.user = $rootScope.CurrentUser;
	
	$scope.PlaceOrder = function(){
		console.log("Place Order");
		$scope.Basket.payment = $scope.payment;
		OrderFactory.placeOrder($scope.Basket);
	};

}]);

