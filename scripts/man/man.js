import { Cart } from "../../data/cart.js";
import { Inventory } from "../../data/Inventory.js";
import { Products } from "../../data/Products.js";
import { loadCartValue } from "../shared/header.js";

const cart = new Cart('Order');
const products = new Products('Products');
const inventory = new Inventory('Inventory');

function renderProduct() {
  loadCartValue();
  const containerElem = document.querySelector('.men-product-container');
  let productHTML = '';
  inventory.items.forEach((item) => {
    const price = products.getMatchingItem(item.productId)?.price;
    const markup = products.getMatchingItem(item.productId)?.markup;
    const totalPrice = Number(price) + Number(markup);
    productHTML += `
      <div class=" relative group grid gap-2 text-primary text-center" >
        <div class="js-view-item  rounded-lg w-full aspect-4/4 overflow-hidden cursor-pointer" data-item-Id = ${item.inventoryId} >
          <img src="${item.image}" class="w-full h-full object-cover"/>
        </div>
        <p class="font-semibold text-sm">${products.getMatchingItem(item.productId)?.name ?? ''}</p>
        <p class="font-light text-sm">$${products.displayPrice(totalPrice)} AUD</p>

        <button class="js-add-button  bg-background text-primary font-extralight text-sm px-3 py-1 rounded-md
          opacity-0 group-hover:opacity-100 translate-y-2
          transition-all duration-300 group-hover:translate-y-0
          absolute bottom-20 right-5 cursor-pointer" data-item-Id = ${item.inventoryId}
          >
           + Quick add
          </button>
      </div>
    `;
  });
  if(containerElem)
  containerElem.innerHTML = productHTML;
  
  document.querySelectorAll('.js-view-item').forEach((view) => {
    view.addEventListener('click', () => {
      const itemId = view.dataset.itemId;
      window.location.href = `/html/view-item/view-item.html?id=${itemId}`;
    });
  });

  document.querySelectorAll('.js-add-button').forEach((add) => {
    add.addEventListener('click', () => {
      const itemId = add.dataset.productId;
      cart.addToCart(itemId, 1);
      loadCartValue();
    });
  });
}

renderProduct();
