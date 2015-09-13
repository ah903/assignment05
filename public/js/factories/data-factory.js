angular.module("attire-app").factory("DataFactory",["$http", function($http){
	
	var getProducts = function(group,category){
		var serviceEndpoint = "/api/products/?group=" + group + "&category=" + category;
		return $http.get(serviceEndpoint);
	};

	return{
		getProducts:getProducts

	};
	
}]);