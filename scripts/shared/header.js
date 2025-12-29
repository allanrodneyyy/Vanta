import { Cart } from "../../data/cart.js";
import { renderCartDialog } from "./modal.js";

const cart = new Cart('Order');

export function loadCartValue() {
  cart.loadFromStorage();
  const cartElem = document.querySelector('.js-header-cart-quantity');

  if(cart.items.length){
    cartElem.classList.remove('hidden');
    cartElem.innerText = cart.items.length;
  }
  
}

export function clickedHeaderCart() {
  const cartElem = document.querySelector('.js-cart-header');
  cartElem.addEventListener('click', () => {
    renderCartDialog();
  });
}