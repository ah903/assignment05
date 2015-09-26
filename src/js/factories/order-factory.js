angular.module("attire-app").factory("OrderFactory",["$http", function($http){
	
	////////////////////////////////////////////////////////////////////////
	// Factory Configuration 
	////////////////////////////////////////////////////////////////////////
	var serviceEndPoints = {
		OrderEndPoint : "/api/customers/orders"
	};

	var placeOrder = function(order, callback){
		console.log("Place Order Factory");
		$http.post(serviceEndPoints.OrderEndPoint,order)
		.success(function(response){
			callback(response);
		});
	};

	return{
		placeOrder:placeOrder
	};

}]);