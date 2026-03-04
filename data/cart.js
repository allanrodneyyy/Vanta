export class Cart {
  cart;
  #localStorageKey;
  
  constructor(localStorageKey) {
   this.#localStorageKey = localStorageKey;
   this.loadFromStorage(); 
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cart));
  }

  loadFromStorage() {
    this.cart = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  addToCart(inventoryId, quantityParam) {
    let result;
    const quantity = Number(quantityParam);
    let matchingItem;
    this.cart.forEach((value) => {
      if(value.inventoryId === inventoryId) {
        matchingItem = value;
        result = true;
      }
    });
    
    if(matchingItem)
      matchingItem.quantity += quantity;
    else 
      this.cart.push({inventoryId, quantity: quantity});

    this.saveToStorage();
    return result;
  }

  getMatchingItem(cartId) {
    this.loadFromStorage();
    let matchingItem;
     this.cart.forEach((value) => {
      if(Number(value.inventoryId) === Number(cartId)) {
        matchingItem = value;
      }
    });

    return matchingItem;
  }
}