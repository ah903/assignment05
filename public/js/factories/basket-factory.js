///////////////////////////////////////////////////////////////////////////////////////////////////
// Basket Factory
// Singleton Factory Responsible for managing connection to backend database
// Follows a pattern of using $http object to connect to an API endpoint
// and post processing the promise with the .then construct to make it simpler
// for consuming controllers
///////////////////////////////////////////////////////////////////////////////////////////////////
// This pattern is also useful to hide physical data storage implementations
// from controllers so a controller may make a single call to the factory and
// not need to know that the factory may chain multiple promises to assemble
// the data requested
///////////////////////////////////////////////////////////////////////////////////////////////////
// Dependencies
// $http injected in
///////////////////////////////////////////////////////////////////////////////////////////////////
angular.module("attire-app").factory("BasketFactory",function(){

	//////////////////////////////////////////////////////////////////////
	// Local Variables
	//////////////////////////////////////////////////////////////////////
	var basket={
		userId:"",
		total:0.00,
		count:0,
		items:[]
	};

	//////////////////////////////////////////////////////////////////////
	// addToBasket
	//////////////////////////////////////////////////////////////////////
	// Adds an item to the basket. If the Item already exists the 
	// Quantities are adjusted to reflect the additional purchase	
	//////////////////////////////////////////////////////////////////////
	// Parameters 	: Product To Add
	// 				: Quantity of Product to Add
	// Returns		: Basket
	//////////////////////////////////////////////////////////////////////
	var addToBasket = function(product, productOptions){

		var matchingBasketItem=findItemInBasket(product);
		var price = Number(product.price.replace(/[^0-9\.]+/g,""));
		if(matchingBasketItem){
			var currentQuantity = matchingBasketItem.productOptions.quantityOption;
			var updatedQuantity = productOptions.quantityOption + currentQuantity;
			productOptions.quantityOption=updatedQuantity;
			matchingBasketItem.productOptions=productOptions;
			matchingBasketItem.subTotal = updatedQuantity * price;
			basket.total += (updatedQuantity-currentQuantity) * price;
			basket.count += (updatedQuantity-currentQuantity);
		}
		else{
			var newBasketItem = {product:product,productOptions:productOptions,subTotal:productOptions.quantityOption * price};
			basket.items.push(newBasketItem);
			basket.total += productOptions.quantityOption * price;
		    basket.count += productOptions.quantityOption;
		}

		return basket;
	};

	//////////////////////////////////////////////////////////////////////
	// findItemInBasket
	//////////////////////////////////////////////////////////////////////
	// Helper Function To Look for Matching Products In The Basket
	// Returns the relevant Basket Entry object if Found
	//////////////////////////////////////////////////////////////////////
	// Parameters 	: Product To Look For
	// Returns		: Object or Null
	//////////////////////////////////////////////////////////////////////
	function findItemInBasket(product){
		for(var i=0; i < basket.items.length; i++){
			if(basket.items[i].product.productId===product.productId){
				return basket.items[i];
			}
		}
		return null;
	}
	
	//////////////////////////////////////////////////////////////////////
	// getBasket
	//////////////////////////////////////////////////////////////////////
	// Returns the contents of the user shopping basket
	//////////////////////////////////////////////////////////////////////
	// Parameters 	: None
	// Returns		: Basket
	//////////////////////////////////////////////////////////////////////
	var getBasket = function(){
		return basket;
	};


	return{
		addToBasket:addToBasket,
		getBasket:getBasket
	}

});