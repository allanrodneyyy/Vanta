import { Cart } from "../data/cart.js";
import { Products } from "../data/products.js";

const products = new Products();
const cart = new Cart();

const url = new URL(window.location.href);
export const itemId = url.searchParams.get('id');
const viewedItem = products.getMatchingItem(itemId);

let viewHTML = '';
const viewElem = document.querySelector('.view-main-content');

function generateHTML() {
  viewHTML = `
    <div>
      <img class = "w-auto object-contain" src="/${viewedItem.image}" alt="">
    </div>
    <div class="text-primary flex flex-col gap-5">
      <section class="flex justify-between items-center">
        <p class="font-extrabold text-4xl">${viewedItem.name}</p>
        <p class="font-extralight text-2xl">${products.displayPrice(viewedItem.basePriceCents)} AUD</p>
      </section>
      <section class="flex item-center gap-2 mb-5">
        <p class="bg-stone-400 rounded-md px-2 py-1 text-white text-xs font-light">New Arrival</p>
        <p class="bg-stone-950 rounded-md px-2 py-1 text-white text-xs font-light">Sold out</p>
      </section>
      <section class="flex flex-col gap-3">
        <p class="text-sm font-light">Select Variant: </p>
        <div class="flex flex-wrap gap-2 ">
            <img class="size-15 rounded-md border border-gray-200" src="/resources/product-image/BOX-TEE-BLACK-FRONT.webp" alt="">
            <img class="size-15 rounded-md border border-gray-200" src="/resources/product-image/BOX-TEE-BLACK-FRONT.webp" alt="">
            <img class="size-15 rounded-md border border-gray-200" src="/resources/product-image/BOX-TEE-BLACK-FRONT.webp" alt="">
            <img class="size-15 rounded-md border border-gray-200" src="/resources/product-image/BOX-TEE-BLACK-FRONT.webp" alt="">
            <img class="size-15 rounded-md border border-gray-200" src="/resources/product-image/BOX-TEE-BLACK-FRONT.webp" alt="">
        </div>
      </section>
      <section>
        <p class="text-sm font-light"></span></p>
      </section>
      <section>
        <p class="mb-2 text-xs font-extralight tracking-tight">select size:</p>
        <div class="flex flex-wrap gap-0.5 mb-1">
          <button class="border border-gray-400 px-3 py-1">
            S
          </button>
          <button class="border border-gray-400 px-3 py-1">
            M
          </button>
          <button class="border border-gray-400 px-3 py-1">
            L
          </button>
          <button class="border border-gray-400 px-3 py-1">
            XL
          </button>
          <button class="border border-gray-400 px-3 py-1">
            XXL
          </button>
        </div>
        <p class="mb-2 text-xs font-bold underline ">size guide</p>
      </section>
      <section>
        <p class="mb-1 text-xs font-extralight tracking-tight">Quantity:</p>
        <div class="flex">
          <div class="border border-gray-300">
            <button class="js-quantity-minus-btn p-3">-</button>
            <input class="js-quantity outline-0 text-sm text-center size-7" type="text" disabled value="1">
            <button class="js-quantity-add-btn p-3">+</button>
          </div>
        </div>
      </section>
      <button class="js-add-to-cart-btn border py-2 w-auto lg:w-2/4">
        ADD 
      </button>
      <section class="flex">
        <div class="flex gap-7 text-sm font-bold border-gray-300 lg:w-2/4">
          <p class="border-b-2 border-black ">Description</p>
          <p>Sizing</p>
          <p>Shipping</p>
          <p>Returns</p>
        </div>
      </section>  
    </div>
  `;

  viewElem.innerHTML = viewHTML;
  initQuantityControl();
  addToCartControl();
}

generateHTML();

function initQuantityControl() {
  const addElem = document.querySelector('.js-quantity-add-btn');
  const minusElem = document.querySelector('.js-quantity-minus-btn');
  const quantityElem = document.querySelector('.js-quantity');

  addElem.addEventListener('click', () => {
    quantityElem.value++;
  });
  minusElem.addEventListener('click', () => {
    if(quantityElem.value > 1)
      quantityElem.value--;
  });
}

function addToCartControl() {
  const addToCartElem = document.querySelector('.js-add-to-cart-btn');

  addToCartElem.addEventListener('click', () => {
    cart.items.push(itemId);
  });
}