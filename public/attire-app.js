var app = angular.module("attire-app", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
    console.log("Client Side Routing");
    $routeProvider.
      when("/home", {
        templateUrl: "partials/home.html",
        controller: "home-controller"
      }).      
      when("/login", {
        templateUrl: "partials/login.html",
        controller: "login-controller"
      }).
      when("/register", {
        templateUrl: "partials/register.html",
        controller: "register-controller"
      }).
      when("/basket", {
        templateUrl: "partials/basket.html",
        controller: "basket-controller"
      }).
      when("/products/:group?/:category?", {
        templateUrl: "partials/products.html",
        controller: "product-controller"
      }).
      when("/checkout", {
        templateUrl: "partials/checkout.html",
        controller: "checkout-controller"
      }).
      otherwise({
        redirectTo: "/home"
      });
  }]);


angular.module("attire-app").controller("home-controller", function($scope){
	console.log("Home Controller");
	$scope.greeting="Welcome Andrew Home Controller";
});

angular.module("attire-app").controller("login-controller", function($scope){
    console.log("Login Controller");
    $scope.greeting="Welcome Andrew Login Controller";
});

angular.module("attire-app").controller("register-controller", function($scope){
    console.log("Register Controller");
    $scope.greeting="Welcome Andrew Register Controller";
});

angular.module("attire-app").controller("basket-controller", function($scope){
    console.log("Basket Controller");
    $scope.greeting="Welcome Andrew Basket Controller";
});

angular.module("attire-app").controller("product-controller", function($scope){
    console.log("Product Controller");
    $scope.greeting="Welcome Andrew Product Controller";
});

angular.module("attire-app").controller("checkout-controller", function($scope){
    console.log("Checkout Controller");
    $scope.greeting="Welcome Andrew Checkout Controller";
});