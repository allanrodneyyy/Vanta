export class Cart {
  items;
  #localStorageKey;
  
  constructor(localStorageKey) {
   this.#localStorageKey = localStorageKey;
   this.loadFromStorage(); 
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.items));
  }

  loadFromStorage() {
    this.items = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];

  }

  addToCart(itemId, quantityParam) {
    const quantity = Number(quantityParam);
    let matchingItem;
    this.items.forEach((value) => {
      if(value.itemId === itemId) {
        matchingItem = value;
      }
    });
    
    if(matchingItem)
      matchingItem.quantity += quantity;
    else 
      this.items.push({itemId, quantity: quantity});

    this.saveToStorage();
  }
}