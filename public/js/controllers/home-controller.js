///////////////////////////////////////////////////////////////////////////////////////////
// Home Controller
///////////////////////////////////////////////////////////////////////////////////////////
// Manages the data that is presented to the view and provides interaction points
// To Back end service functionality. Attached to attire-app module. Uses Minification
// Safe Injection mechanism
///////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// $scope
///////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app").controller("HomeController", ["$scope","ProductFactory",function($scope, ProductFactory){
	
	
	var promotionTypes={
		SpecialOffer:"Special Offer",
		NewCollection:"New",
		Save10Percent:"Save 10%",
		Save20Percent:"Save 20%"
	};

	///////////////////////////////////////////////////////////////////////////
	// Initial View - Load Data When Controller Is Instantiated
	///////////////////////////////////////////////////////////////////////////
	var promiseSpecial=ProductFactory.getProductsOnOffer(promotionTypes.SpecialOffer);
		promiseSpecial.success(function(response){
		$scope.specialOffers=response;
	});
	
	var promiseNew=ProductFactory.getProductsOnOffer(promotionTypes.NewCollection);
		promiseNew.success(function(response){
		$scope.newStock=response;
	});
	

}]);

