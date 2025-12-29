import { Cart } from "../../data/cart.js";
import { Products } from "../../data/products.js";
import { loadCartValue, clickedHeaderCart } from "../shared/header.js";

const cart = new Cart('Order');
const products = new Products();
clickedHeaderCart();

function renderProduct() {
  loadCartValue();
  const containerElem = document.querySelector('.men-product-container');
  let productHTML = '';

  products.items.forEach((item) => {
    productHTML += `
      <div class=" relative group grid gap-2 text-primary text-center" >
        <div class="js-view-item  rounded-lg w-full aspect-4/4 overflow-hidden cursor-pointer" data-product-Id = ${item.id} >
          <img src="/${item.image}" class="w-full h-full object-cover"/>
        </div>
        <p class="font-semibold text-sm">${item.name}</p>
        <p class="font-light text-sm">$${products.displayPrice(item.basePriceCents)} AUD</p>

        <button class="js-add-button  bg-background text-primary font-extralight text-sm px-3 py-1 rounded-md
          opacity-0 group-hover:opacity-100 translate-y-2
          transition-all duration-300 group-hover:translate-y-0
          absolute bottom-20 right-5 cursor-pointer" data-product-Id = ${item.id}
          >
           + Quick add
          </button>
      </div>
    `;
  });
  containerElem.innerHTML = productHTML;
  document.querySelectorAll('.js-view-item').forEach((view) => {
    view.addEventListener('click', () => {
      const itemId = view.dataset.productId;
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
