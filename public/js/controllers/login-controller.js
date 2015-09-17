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
angular.module("attire-app").controller("LoginController", ["$scope","$location","$rootScope","CustomerFactory", function($scope,$location,$rootScope,CustomerFactory){
    

    var AUTHENTICATION_ERROR = "Incorrect username or password"

    //$scope.currentUser = {name:"Alan"};

    $scope.login = function(user){
        
        $scope.error="";

        CustomerFactory.login(user,function(response){
            if(response){
                console.log("Authenticated");
                $rootScope.CurrentUser = response;
                $location.url("/home");
            }
            else{
                $scope.loginError=AUTHENTICATION_ERROR;
            }
        });
    };

    $scope.logout = function(){
        $rootScope.CurrentUser = null;
    };

}]);
