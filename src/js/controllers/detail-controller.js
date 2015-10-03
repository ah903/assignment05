///////////////////////////////////////////////////////////////////////////////////////////
// Detail Controller
///////////////////////////////////////////////////////////////////////////////////////////
// Manages the data that is presented to the view and provides interaction points
// To Back end service functionality. Attached to attire-app module. Uses Minification
// Safe Injection mechanism
///////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// $scope, $routeParams, $location, $routeScope, ProductFactory
///////////////////////////////////////////////////////////////////////////////////////////

angular.module("attire-app").controller("DetailController", ["$scope","$routeParams","$rootScope","ProductFactory","BasketFactory",function($scope,$routeParams,$rootScope,ProductFactory,BasketFactory){

	var MAX_RATING=5;
	$scope.ratingRange = new Array(MAX_RATING);

	///////////////////////////////////////////////////////////////////////////
	// Initial View - Load Data When Controller Is Instantiated
	///////////////////////////////////////////////////////////////////////////
	ProductFactory.getProductById($routeParams.productId).then(function(response){
		$scope.CurrentProduct = response;	
		$scope.sizeOption = response.sizes[0];
		$scope.colorOption = response.colors[0];	
	});

	///////////////////////////////////////////////////////////////////////////
	// Controller Functions Exposed to View By Scope
	///////////////////////////////////////////////////////////////////////////
	// AddToBasket
	// Adds the product To The Shopping Basket
	// Issues an OnBasketChanged Notification via rootscope to ensure
	// Sibling controllers receive the message
	///////////////////////////////////////////////////////////////////////////
	// Parameters : product
	///////////////////////////////////////////////////////////////////////////
	$scope.AddToBasket = function(product){
		
		var sOption = $scope.sizeOption;
		var cOption = $scope.colorOption;
		
		var productOptions = {
			quantityOption:1,
			sizeOption:$scope.sizeOption,
			colorOption:$scope.colorOption
		};
		$scope.Basket = BasketFactory.addToBasket(product,productOptions);
		$rootScope.$broadcast("OnBasketChanged",$scope.Basket);
	};

	///////////////////////////////////////////////////////////////////////////
	// GetBasket
	// Sets The Scope Shopping Basket for the view to consume
	///////////////////////////////////////////////////////////////////////////
	// Parameters : None
	///////////////////////////////////////////////////////////////////////////
	$scope.GetBasket = function(){
		$scope.Basket = BasketFactory.getBasket();
	};

}]);
