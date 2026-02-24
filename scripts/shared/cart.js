import { Cart } from "../../data/Cart";
import { Products } from "../../data/Products";
import { showCartDialog } from "./modal";
import { Inventory } from "../../data/Inventory.js";
import { AttributeValues } from "../../data/AttributeValues.js";

const attributeValues = new AttributeValues('AttributeValue');
const cart = new Cart('Order');
const inventory = new Inventory('Inventory');
const products = new Products('Products');

let allItems = [];
cart.cart.forEach((item) => {
  allItems.push(inventory.getMatchingItemInInventory(item.inventoryId));
});

export function renderCartDialog() {
  let dialogHTML = '';
  const dialogContElem = document.querySelector('.header-cart-container');

  dialogHTML += `
      <dialog class = "cart-header-dialog w-[90%] lg:w-[25%] flex flex-col border fixed top-5 right-4 m-0 inset-auto backdrop:bg-gray-900/50 ">
      <form class = "cart-dialog-container" method="dialog">
        <div class="dialog-main-content p-5 flex flex-col gap-5 lg:gap-7">
          <div class="grid auto-rows-auto gap-5
            max-h-[50vh] lg:max-h-105
            overflow-y-auto pr-1">
            <section class="cart-values-container flex gap-2 flex-col">
              
            </section>
          </div>
        </div>
        <footer class="flex flex-col gap-5 p-5 border-t border-t-gray-400">
            <section class="flex flex-col gap-3">
              <div class="flex flex-col gap-0.5 font-semibold text-base">
                <section class="flex justify-between">
                  <p>Subtotal</p>
                  <p>$114 AUD</p>
                </section>
                <section>
                  <p class="text-xs font-light">
                    Taxes and shipping calculated at checkout
                  </p>
                </section>
              </div>
              <div class="flex justify-between font-bold text-xl">
                <p>Total</p>
                <p>$114 AUD</p>
              </div>
            </section>
            <section class="grid grid-cols-2 gap-2 ">
              <button class = "dialog-view-cart-btn border p-3 rounded-xl text-xs font-semibold">View cart</button>
              <button class = "border p-3 bg-stone-900 rounded-xl text-xs font-semibold text-white">Checkout</button>
            </section>
          </footer> 
      </form>
    </dialog>
    `;
 
  dialogContElem.innerHTML = dialogHTML;
  showCartDialog();
  addValueToDialog();
}

function addValueToDialog() {
  const container = document.querySelector('.cart-values-container');
  let containerHTML = allItems.map((item) => {
    const product = products.getMatchingItem(item.productId);
    const totalPrice = Number(product?.price) + Number(product?.markup); 
    return `
    <div class ="flex gap-x-2">
        <div class="flex gap-3">
          <img class="size-24" src="${item.image}" alt="">
          <section class="flex flex-col justify-center">
            <p class="text-xs font-light">Vanta</p>
            <p class="font-bold text-sm">${product?.name}</p>
            
            <section class=" grid grid-cols-2 gap-x-2 font-normal text-xs items-center">
              ${displayAttributes(item.attributes,item.inventoryId, totalPrice)}
            </section>

          </section>
        </div>
      </div>
    `;
  }).join("");
  container.innerHTML = containerHTML;
  
}

function displayAttributes(attr, inventoryId, price){
  const size = attributeValues.getAttributeValues(attr?.sizeId)?.attributeValue;
  const color = attributeValues.getAttributeValues(attr?.colorId)?.attributeValue;
  const quantity = cart.getMatchingItem(inventoryId)?.quantity;
  const totalPrice = Number(quantity) * Number(price);
  return `
    <p class="">Color:</p>
    <p class="">${color}</p>
    <p class="">Size:</p>
    <p class="">${size}</p>
    <p class="">Quantity:</p>
    <p class="">${quantity}</p>
    <p class="">Total</p>
    <p class="font-semibold">$${totalPrice.toFixed(2)}</p>
  `;
}

 