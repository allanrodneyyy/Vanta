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
function renderAllItems() {
  allItems = [];
  cart.cart.forEach((item) => {
    allItems.push(inventory.getMatchingItemInInventory(item.inventoryId));
  });
}

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
                  <p  class="js-subtotal">$114 AUD</p>
                </section>
                <section>
                  <p class="text-xs font-light">
                    Taxes and shipping calculated at checkout
                  </p>
                </section>
              </div>
              <div class=" flex justify-between font-bold text-xl">
                <p>Total</p>
                <p class="js-total">$114 AUD</p>
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
  displayFooterDialog();
}

function addValueToDialog() {
  renderAllItems();
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
              ${displayAttributesDialog(item.attributes,item.inventoryId, totalPrice)}
            </section>

          </section>
        </div>
      </div>
    `;
  }).join("");
  container.innerHTML = containerHTML;
  
}
let totalandSubtotal = 0;
function displayAttributesDialog(attr, inventoryId, price){
  const size = attributeValues.getAttributeValues(attr?.sizeId)?.attributeValue;
  const color = attributeValues.getAttributeValues(attr?.colorId)?.attributeValue;
  const quantity = cart.getMatchingItem(inventoryId)?.quantity;
  const totalPricePerItem = Number(quantity) * Number(price);
  if(totalPricePerItem)
    totalandSubtotal += totalPricePerItem;

  return `
    <p class="">Color:</p>
    <p class="">${color}</p>
    <p class="">Size:</p>
    <p class="">${size}</p>
    <p class="">Quantity:</p>
    <p class="">${quantity}</p>
    <p class="">Total</p>
    <p class="font-semibold">$${totalPricePerItem.toFixed(2)}</p>
  `;
}

function displayFooterDialog(){
  const footerTotalElem = document.querySelector('.js-total');
  const footerSubtotalElem = document.querySelector('.js-subtotal');
  footerTotalElem.innerText = totalandSubtotal.toFixed(2);
  footerSubtotalElem.innerText = totalandSubtotal.toFixed(2);
}

function renderCartHTML() {
  renderAllItems();
  const container = document.querySelector('.cart-container-html');
  let containerHTML = '';
  let quantity = 0;

  containerHTML += allItems.map((item) => {
    const product = products.getMatchingItem(item.productId);
    const pricePerItem = Number(product?.price) + Number(product?.markup);
    const size = attributeValues.getAttributeValues(item.attributes?.sizeId)?.attributeValue;
    quantity = cart.getMatchingItem(item.inventoryId)?.quantity ?? 1;
    const totalPrice = pricePerItem * quantity;
    
    return `
      <tr>
        <td class="flex items-center-safe gap-5 mt-5">
          <img class="size-24" src="${item?.image}" alt="">
          <div class="flex flex-col gap-1.5">
            <p class="font-bold">${product?.name ?? ''}</p>
            <p class="">$${pricePerItem.toFixed(2)}</p>
            <p class="">${size}</p>
            <div class="flex gap-2 min-[640px]:hidden">
              <div class="border border-gray-300 w-22 py-1">
                <button class="js-quantity-minus-btn pl-1.5" data-inventory-id = ${item.inventoryId}>-</button>
                <input class="js-quantity outline-0 text-sm text-center w-11"  type="text" id = ${item.inventoryId}  disabled value = "${quantity ?? 1}">
                <button type= "button" class="js-quantity-add-btn" data-inventory-id = ${item.inventoryId}>+</button>
              </div>
              <button class="underline">
                Remove
              </button>
            </div>
          </div>
        </td>
        <td class="text-center max-[640px]:hidden">
          <div class=" flex items-center justify-center py-1">
            <div class="border border-gray-300 p-1.5 rounded-md">
              <button class="js-quantity-minus-btn pl-1.5" data-inventory-id = ${item.inventoryId} data-operation-id = "minus">-</button>
              <input class="js-quantity outline-0 text-sm text-center w-11"  type="text" id = ${item.inventoryId}  disabled value = "${quantity ?? 1}">
              <button type= "button" class="js-quantity-add-btn" data-inventory-id = ${item.inventoryId}>+</button>
            </div>
          </div>
          <button class="underline js-remove-item" data-inventory-id = ${item.inventoryId}>
            Remove
          </button>
        </td>
        <td class="text-right max-[640px]:hidden">$${totalPrice.toFixed(2)}</td>
      </tr>
    `;
  }).join("");
  if(container)
    container.innerHTML = containerHTML;

  initQuantityFunctions();
  removeItem();
}
 
renderCartHTML();

function initQuantityFunctions() {
  const addQuantityElem = document.querySelectorAll('.js-quantity-add-btn');
  const minusQuantityElem = document.querySelectorAll('.js-quantity-minus-btn');

  addQuantityElem.forEach((field) => {
    calculateQuantityAndTotal(field);
  });
  minusQuantityElem.forEach((field) => {
    calculateQuantityAndTotal(field);
  });
}

function calculateQuantityAndTotal(field) {
  field.addEventListener('click', () => {
    const operationId = field.dataset.operationId;
    const inventoryId = field.dataset.inventoryId;

    const itemInInventory = inventory.getMatchingItemInInventory(inventoryId);
    const itemInCart = cart.getMatchingItem(inventoryId);

    let quantityChange = 1;

    // minus button
    if (operationId) {
      if (itemInCart.quantity <= 1) return; // STOP at 1
      quantityChange = -1;
    }

    // check stock only when adding
    if (quantityChange === 1) {
      const canAdd = quantityCheck(itemInCart.quantity, itemInInventory.quantity);
      if (!canAdd) return;
    }

    cart.addToCart(inventoryId, quantityChange);
    renderCartHTML();
  });
}

function quantityCheck(cartQuantity, itemInInventoryQuantity) {
  return cartQuantity < itemInInventoryQuantity;
}

function removeItem () {
  const removeElem = document.querySelectorAll('.js-remove-item');

  removeElem.forEach((removeButton) => {
    removeButton.addEventListener('click', () => {
      const inventoryId = removeButton.dataset.inventoryId;
      cart.deleteFromCart(inventoryId);
      renderCartHTML();
    });
  });
}