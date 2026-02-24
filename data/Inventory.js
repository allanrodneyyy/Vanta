import { Products } from "./Products";
const product = new Products('Products');
export class Inventory {
  items;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey; 
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.items));
  }

  loadFromLocalStorage() {
    this.items = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  insertIntoInventory(data) {
    let matchingItem = this.items.find(v => v.inventoryId === data.inventoryId);
    if(matchingItem) 
      this.items.forEach((item, index) => {
        if(item.inventoryId === data.inventoryId) {
          data.quantity = Number(data.quantity) + Number(item.quantity);
          this.items[index] = data;
        }
      });
    else 
      this.items.push(data);

    this.saveToLocalStorage();
  }

  deleteFromInventory(inventoryId){
    let result = false;
    
    this.items.forEach((item, index) => {
      if(Number(item.inventoryId) === Number(inventoryId)){
        this.items.splice(index, 1);
        result = true;
      }
    });
    this.saveToLocalStorage();
    return result;
  }

  searchFromInventory(searchWord) {
    let tempValue = [];

    if(!searchWord)
      return this.items;

    if(searchWord){
      this.items.forEach((item) => {
        const itemName = product.getMatchingItem(item.productId)?.name.toLowerCase();
        if(itemName.includes(searchWord.toLowerCase())) 
          tempValue.push(item);
      });
    }
    return tempValue;
  }

  getMatchingItemInInventory(inventoryId) {
    let tempValue = [];
    this.items.forEach((item) => {
      if(Number(item.inventoryId) === Number(inventoryId)) {
        tempValue = item;
      }
    });
    return tempValue;
  }

  getAllItem(productId) {
    let tempValue = [];
    this.items.forEach((item) => {
      if(Number(item.productId) === Number(productId)) {
        tempValue.push(item);
      }
    });
    return tempValue;
  }

  itemIsExisting(productId, attributesIds) {
    let tempValue = null;
    this.items.forEach((item) => {
      if(Number(item.productId) === Number(productId)) 
        if(item.attributes.sizeId === attributesIds.sizeId && item.attributes.colorId === attributesIds.colorId) 
          tempValue = item;
    });
    return tempValue;
  }

  getAllVariants(collectionId){
    return this.items.filter(v => Number(v.collectionId) === Number(collectionId));
  }

  updateQuantity(inventoryId, quantity) {
    let result;
    this.items.forEach((i, index) => {
      if(i.inventoryId === Number(inventoryId)){
        this.items[index].quantity -= quantity;
        result = true;
      }
    });

    this.saveToLocalStorage();
    return result;
  }
}