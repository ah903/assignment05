angular.module("attire-app").factory("CustomerFactory",["$http", function($http){

	var user = null;

	var currentUser = function(){
		return user;
	};

	var login = function(user){
		var serviceEndPoint = "/api/customers/login";
		
		var promise = $http.post(serviceEndPoint,user);
		promise.then(function(results){
			return results.data;
		});
		return promise;
		
	};

	var logout = function(user){
		user = null;
	}

	return{
		currentUser:currentUser,
		login:login,
		logout:logout
	};

}]);