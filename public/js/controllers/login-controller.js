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
    

    var AUTHENTICATION_ERROR = "Incorrect username or password"

    $scope.currentUser = CustomerFactory.currentUser();

    $scope.login = function(user){
        
        $scope.error="";

        CustomerFactory.login(user,function(response){
            if(response){
                console.log("Authenticated");
                $scope.currentUser = CustomerFactory.currentUser();
                $location.path("/home");
            }
            else{
                $scope.error=AUTHENTICATION_ERROR;
            }
        });
    };

    $scope.logout = function(){
    	CustomerFactory.logout(function(response){
    		if(response){
                $scope.currentUser = CustomerFactory.currentUser();
            }
     	});
    }

}]);
