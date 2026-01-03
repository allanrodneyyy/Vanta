export class Products {

  products;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.products));
  }

  loadFromLocalStorage() {
     this.products = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "resources/product-image/BOX-TEE-BLACK-FRONT.webp",
        name: "Box Tee Black Front",
        basePriceCents: 1090,
        description: 'Sample'
      }, {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c7",
        image: "resources/product-image/BOX-TEE-CHALK-FRONT.webp",
        name: "Box Tee Chalk Front",
        rating: {
          stars: 4.5,
          count: 87
        },
        basePriceCents: 1090,
        keywords: [
          "socks",
          "sports",
          "apparel"
        ],
        quantity: 20,
      }];
  }

  insertProducts(data) {
    this.products.push(data);
    this.saveToLocalStorage();
    console.log(this.products);
  }

  deleteProduct(itemId) {
    let result = false;
    this.products.forEach((item, index) => {
      if(item.id === Number(itemId)) {
        this.products.splice(index, 1);
        result = true;
      }
    });
    this.saveToLocalStorage();
    return result;
  }

  displayPrice(basePriceCents) {
    return (Math.round(basePriceCents) / 100).toFixed(2); 
  }

  getMatchingItem(itemId) {
    let tempValue = [];
    this.items.forEach((value) => {
      if(value.id === itemId) {
        tempValue = value;
      }
    });
    return tempValue;
  }

}

