angular.module("attire-app").factory("OrderFactory",["$http", function($http){
	
	////////////////////////////////////////////////////////////////////////
	// Factory Configuration 
	////////////////////////////////////////////////////////////////////////
	var serviceEndPoints = {
		CustomerEndPoint : "/api/customers/"
	};

	var placeOrder = function(order, callback){
		var endPoint=serviceEndPoints.CustomerEndPoint + order.user._Id + "/orders";
		$http.post(endPoint,order)
		.success(function(response){
			callback(response);
		});
	};

	var getOrdersForUser = function(user, callback){
		var endPoint=serviceEndPoints.CustomerEndPoint + user._id + "/orders";
		$http.get(endPoint)
		.success(function(response){
			callback(response);
		});
	};

	return{
		getOrdersForUser: getOrdersForUser,
		placeOrder:placeOrder
	};

}]);