import { Cart } from "../../data/cart.js";
import { renderCartDialog } from "./modal.js";

const cart = new Cart('Order');

export function loadCartValue() {
  cart.loadFromStorage();
  
  if(document.querySelector('.js-header-cart-quantity')) {
    const cartElem = document.querySelectorAll('.js-header-cart-quantity');
  

    if(cart.items.length){
      cartElem.forEach((elem) => {
        elem.classList.remove('hidden');
        elem.innerText = cart.items.length;
      });
    } 
  }
}

  if(document.querySelector('.js-cart-header')) {
    const cartElem = document.querySelectorAll('.js-cart-header')
      .forEach((cart) => {
        cart.addEventListener('click', () => {
          renderCartDialog();
        });
      });
  }

  if(document.querySelector('.js-login-header')) {
    document.querySelectorAll('.js-login-header')
    .forEach((loginButton) => {
      loginButton.addEventListener('click', () => {
        window.location.href = "/html/login/login.html";
      });
    });
  }
  