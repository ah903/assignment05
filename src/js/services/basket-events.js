
angular.module("attire-app").service("BasketEventService",["$rootScope",function($rootScope) {
  
    this.broadcast = function() {
    	$rootScope.$broadcast("OnBasketChanged");
    };
    
    this.listen = function(callback) {
    	$rootScope.$on("OnBasketChanged",callback);
    };

}]);