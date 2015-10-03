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
        templateUrl : "partials/home.html",
        controller  : "HomeController"
      }).      
      when("/login", {
        templateUrl : "partials/login.html",
        controller  : "LoginController"
      }).
      when("/register", {
        templateUrl : "partials/register.html",
        controller  : "RegisterController"
      }).
      when("/basket", {
        templateUrl : "partials/basket.html",
        controller  : "BasketController"
      }).
      when("/products/:group?/:category?", {
        templateUrl : "partials/products.html",
        controller  : "ProductController"
      }).
      when("/product/:productId", {
        templateUrl : "partials/detail.html",
        controller  : "DetailController"
      }).
      when("/checkout", {
        templateUrl : "partials/checkout.html",
        controller  : "OrderController",
        requireLogin:true
      }).
      when("/confirmation", {
        templateUrl : "partials/confirm.html",
        controller  : "ConfirmationController",
        requireLogin:true
      }).
      when("/account", {
        templateUrl : "partials/account.html",
        controller  : "AccountController",
        requireLogin:true
      }).
      otherwise({
        redirectTo: "/home"
      });

}]);

///////////////////////////////////////////////////////////////////////////////////////////
// Angular RouteChange Monitor
// Used To Test the Validity of certain transitions and if necessary route the
// transition path thoriugh an authentication step
///////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app").run(["$rootScope","$location",function($rootScope,$location){

  var authorisationRedirect;

  $rootScope.$on("$routeChangeStart", function (event, next, current) {

    if(next.requireLogin && !$rootScope.CurrentUser){
      authorisationRedirect= next;    
      $location.url("/login");
    }

    if(authorisationRedirect && $rootScope.CurrentUser){
       $location.url(authorisationRedirect.$$route.originalPath);
       authorisationRedirect = null;
    }

  });

}]);
