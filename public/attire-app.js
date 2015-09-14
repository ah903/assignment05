///////////////////////////////////////////////////////////////////////////////////////////
// Angular Module Declaration For the application
///////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// NgRoute to support client side navigational routing 
///////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app", ["ngRoute"]);


///////////////////////////////////////////////////////////////////////////////////////////
// Client Side Routing Configuration of Route Provider
// Identifies the controller and template for each route
// Sets Home as the Unconfigured default Route
///////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app").config(["$routeProvider", function($routeProvider) {

    $routeProvider.
      when("/home", {
        templateUrl: "partials/home.html",
        controller: "HomeController"
      }).      
      when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginController"
      }).
      when("/register", {
        templateUrl: "partials/register.html",
        controller: "RegisterController"
      }).
      when("/basket", {
        templateUrl: "partials/basket.html",
        controller: "BasketController"
      }).
      when("/products/:group?/:category?", {
        templateUrl: "partials/products.html",
        controller: "ProductController"
      }).
      when("/product/:productId", {
        templateUrl: "partials/detail.html",
        controller: "DetailController"
      }).
      when("/checkout", {
        templateUrl: "partials/checkout.html",
        controller: "CheckoutController"
      }).
      otherwise({
        redirectTo: "/home"
      });
  }]);

