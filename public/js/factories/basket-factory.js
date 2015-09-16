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

		var matchingBasketItem=findItemInBasket(product,productOptions);
		var price = Number(product.price.replace(/[^0-9\.]+/g,""));
		if(matchingBasketItem){
			var newQuantity = matchingBasketItem.quantity + productOptions.quantityOption;
			matchingBasketItem.productOptions.quantity=newQuantity;
			matchingBasketItem.quantity=newQuantity;
			matchingBasketItem.price=price;
		}
		else{
			var newBasketItem = {
				product:product,
				productOptions:productOptions,
				price:price,
				quantity:productOptions.quantityOption
			};
			basket.items.push(newBasketItem);
		}
		calculateBasket(basket);
		return basket;
	};

	//////////////////////////////////////////////////////////////////////
	// updateBasket
	//////////////////////////////////////////////////////////////////////
	// Recalculates the contents of the basket
	// 
	// Returns the update basket
	//////////////////////////////////////////////////////////////////////
	// Parameters 	: Product To Look For
	//				: Product Options
	// Returns		: Basket
	//////////////////////////////////////////////////////////////////////
	var updateBasket = function(basketItem){
		if(!basketItem.quantity) return;
		basketItem.productOptions.quantity=basketItem.quantity;
		calculateBasket(basket);
		return basket;
	}

	//////////////////////////////////////////////////////////////////////
	// removeFromBasket
	//////////////////////////////////////////////////////////////////////
	// Removes the selected item from the Basket and Recalculates
	// Finds the selected item based on productId, color and size
	// Returns the update basket
	//////////////////////////////////////////////////////////////////////
	// Parameters 	: Basket Item To Look For
	// Returns		: Basket
	//////////////////////////////////////////////////////////////////////
	var removeFromBasket = function(basketItem){
		if(!basketItem) return;
		var index = basket.items.indexOf(basketItem);
		basket.items.splice(index,1);
		calculateBasket(basket);
		return basket;
	}
	//////////////////////////////////////////////////////////////////////
	// findItemInBasket
	//////////////////////////////////////////////////////////////////////
	// Helper Function To Look for Matching Products In The Basket
	// Matches on productId, Size and Color
	// Returns the relevant Basket Entry object if Found
	//////////////////////////////////////////////////////////////////////
	// Parameters 	: Product To Look For
	//				: Product Options
	// Returns		: Object or Null
	//////////////////////////////////////////////////////////////////////
	function findItemInBasket(product,productOptions){

		for(var i=0; i < basket.items.length; i++){
			var basketItem = basket.items[i];
			if(basketItem.product.productId===product.productId 
				&& basketItem.productOptions.sizeOption===productOptions.sizeOption
				&& basketItem.productOptions.colorOption===productOptions.colorOption){
				return basketItem;
			}
		}
		return null;
	}

	//////////////////////////////////////////////////////////////////////
	// calculateBasket
	//////////////////////////////////////////////////////////////////////
	// Helper Function To Recalculate the Basket. Recalculates each line 
	// item subtotal and the overall value of the basket. Updates the 
	// basket object directly with the product count and overall total
	//////////////////////////////////////////////////////////////////////
	// Parameters 	: Basket to calculate
	// Returns		: None
	//////////////////////////////////////////////////////////////////////
	function calculateBasket(basket){
		
		var basketTotal = 0.00;
		var basketCount = 0;
		
		for(var i=0; i < basket.items.length; i++){
			basket.items[i].subTotal=calculateItem(basket.items[i].price, basket.items[i].quantity);
			basketTotal += basket.items[i].subTotal;
			basketCount += basket.items[i].quantity;
		}
		basket.total=basketTotal;
		basket.count=basketCount;
	}

	//////////////////////////////////////////////////////////////////////
	// calculateItem
	//////////////////////////////////////////////////////////////////////
	// Helper Function To Recalculate a line item in the  Basket. 
	// Recalculates each line subtotal an returns the value
	//////////////////////////////////////////////////////////////////////
	// Parameters 		: Price of item
	//					: Quantity
	// Returns			: Subtotal
	//////////////////////////////////////////////////////////////////////
	function calculateItem(price, quantity){
		return  price * quantity;
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
		updateBasket:updateBasket,
		removeFromBasket:removeFromBasket,
		getBasket:getBasket
	}

});