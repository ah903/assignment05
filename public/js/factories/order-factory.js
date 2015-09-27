angular.module("attire-app").factory("OrderFactory",["$http", function($http){
	
	////////////////////////////////////////////////////////////////////////
	// Factory Configuration 
	////////////////////////////////////////////////////////////////////////
	var serviceEndPoints = {
		CustomerEndPoint : "/api/customers/"
	};

	var placeOrder = function(order, callback){
		console.log("Place Order Factory");
		var endPoint=serviceEndPoints.CustomerEndPoint + order.userId + "/orders";
		$http.post(endPoint,order)
		.success(function(response){
			callback(response);
		});
	};

	return{
		placeOrder:placeOrder
	};

}]);