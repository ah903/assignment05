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
angular.module("attire-app").controller("HomeController", function($scope){
	console.log("Home Controller");
	$scope.greeting="Welcome Andrew Home Controller";
});

HomeController.$inject = ["$scope"];