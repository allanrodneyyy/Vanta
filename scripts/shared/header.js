import { Cart } from "../../data/Cart.js";
import { getLoggedInUser } from "../shared/usertoken.js";
import { renderCartDialog } from "./cart.js";

const cart = new Cart('Order');

export function loadCartValue() {
  cart.loadFromStorage();
  
  if(document.querySelector('.js-header-cart-quantity')) {
    const cartElem = document.querySelectorAll('.js-header-cart-quantity');
  
    if(cart.cart.length){
      cartElem.forEach((elem) => {
        elem.classList.remove('hidden');
        elem.innerText = cart.cart.length;
      });
    } 
  }
}

  if(document.querySelector('.js-cart-header')) {
    const cartElem = document.querySelectorAll('.js-cart-header')
      cartElem.forEach((cart) => {
        cart.addEventListener('click', () => {
          renderCartDialog();
        });
      });
  }

  if(document.querySelector('.js-login-header')) {
    document.querySelectorAll('.js-login-header')
    .forEach((loginButton) => {
      loginButton.addEventListener('click', () => {
        if(!getLoggedInUser())
          window.location.href = '/html/login/login.html';
        else 
          window.location.href = '/html/user-page/user-index.html';
      });
    });
  }

  if(document.querySelector('.js-burger-menu')) {
    const burgerElem = document.querySelector('.burger-menu-container');
    document.querySelectorAll('.js-burger-menu')
    .forEach((burgerMenu) => {
      burgerMenu.addEventListener('click', () => {
        burgerElem.classList.remove('hidden');
      });
    });

    const burgerClose = document.querySelector('.close-burger-menu');
    burgerClose.addEventListener('click', () => {
      burgerElem.classList.add('hidden');
    });
    
  }

  
  