///////////////////////////////////////////////////////////////////////////////////////////
// Product Controller
///////////////////////////////////////////////////////////////////////////////////////////
// Manages the data that is presented to the view and provides interaction points
// To Back end service functionality. Attached to attire-app module. Uses Minification
// Safe Injection mechanism
///////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// $scope
///////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app").controller("RegisterController", ["$scope","$location","CustomerFactory",function($scope,$location,CustomerFactory){

	$scope.JoinUp = function(){
		var newUser = $scope.user;
		CustomerFactory.registerUser(newUser, function(response){
			if(response){
				$location.path("/home");		
			}
			else{
				$scope.errorMessage="Opps";
			}
		});
	};

}]);
