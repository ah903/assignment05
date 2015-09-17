///////////////////////////////////////////////////////////////////////////////////////////
// Login Controller
///////////////////////////////////////////////////////////////////////////////////////////
// Manages the data that is presented to the view and provides interaction points
// To Back end service functionality. Attached to attire-app module. Uses Minification
// Safe Injection mechanism
///////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// $scope
///////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app").controller("LoginController", ["$scope","$location","CustomerFactory", function($scope,$location,CustomerFactory){
    
    
    $scope.login = function(user){
        CustomerFactory.login(user).success(function(response){
            $scope.currentUser = response;
            $location.path("/home");  
        });	
    };

    $scope.logout = function(){
    	CustomerFactory.logout().then(function(response){
    		console.login("Logout Factory Method");
    	});
    }

}]);
