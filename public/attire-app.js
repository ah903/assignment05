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
      when("/detail", {
        templateUrl: "partials/detail.html",
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


