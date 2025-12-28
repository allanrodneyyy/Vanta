export class Products {
  items = [
  {
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
  }, {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c8",
    image: "resources/product-image/BOX-TEE-SHADOW-FRONT.webp",
    name: "Box Tee Shadow",
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
  } , {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c9",
    image: "resources/product-image/club-tee-cocoa-front.webp",
    name: "Club Tee Cocoa Front",
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
  }, {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c10",
    image: "resources/product-image/club-tee-icy-gray-back.webp",
    name: "Club Tee Icy Gray Back",
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
  }, {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c11",
    image: "resources/product-image/club-tee-pistachio-front.webp",
    name: "Club Tee Pistachio",
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
  } , {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c12",
    image: "resources/product-image/club-tee-snowberry-front.webp",
    name: "Club Tee Snowberry",
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
  } , {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c13",
    image: "resources/product-image/richboyz-luxury-street-wear-essentials-club-tee-black-3.webp",
    name: "Essentials Club Tee",
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
  } , {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c14",
    image: "resources/product-image/richboyz-luxury-street-wear-essentials-premium-threads-blue-1.webp",
    name: "Essentials Premium Blue",
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
  } , {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c15",
    image: "resources/product-image/S4-TEE-VINTAGE-NAVY-BLUE-FRONT.webp",
    name: "S4 Tee Vintage Front",
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
  }
  
  ]

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

