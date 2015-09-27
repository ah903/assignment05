angular.module("attire-app",["ngRoute"]),angular.module("attire-app").config(["$routeProvider",function(r){r.when("/home",{templateUrl:"partials/home.html",controller:"HomeController"}).when("/login",{templateUrl:"partials/login.html",controller:"LoginController"}).when("/register",{templateUrl:"partials/register.html",controller:"RegisterController"}).when("/basket",{templateUrl:"partials/basket.html",controller:"BasketController"}).when("/products/:group?/:category?",{templateUrl:"partials/products.html",controller:"ProductController"}).when("/product/:productId",{templateUrl:"partials/detail.html",controller:"DetailController"}).when("/checkout",{templateUrl:"partials/checkout.html",controller:"OrderController",requireLogin:!0}).otherwise({redirectTo:"/home"})}]),angular.module("attire-app").run(["$rootScope","$location",function(r,t){var e;r.$on("$routeChangeStart",function(l,o,n){o.requireLogin&&!r.CurrentUser&&(e=o,t.url("/login")),e&&r.CurrentUser&&(t.url(e.$$route.originalPath),e=null)})}]);