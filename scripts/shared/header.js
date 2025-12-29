import { Cart } from "../../data/cart.js";
import { renderCartDialog } from "./modal.js";

const cart = new Cart('Order');

export function loadCartValue() {
  cart.loadFromStorage();
  
  if(document.querySelector('.js-header-cart-quantity')) {
    const cartElem = document.querySelector('.js-header-cart-quantity');

    if(cart.items.length){
      cartElem.classList.remove('hidden');
      cartElem.innerText = cart.items.length;
    } 
  }
}

  if(document.querySelector('.js-cart-header')) {
    const cartElem = document.querySelector('.js-cart-header');
    cartElem.addEventListener('click', () => {
      renderCartDialog();
    });
  }

  if(document.querySelector('.js-login-header')) {
    document.querySelector('.js-login-header')
    .addEventListener('click', () => {
      window.location.href = "/html/login/login.html";
    });
  }
  