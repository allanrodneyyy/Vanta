import { AttributeValues } from "../data/AttributeValues.js";
import { Cart } from "../data/cart.js";
import { Inventory } from "../data/Inventory.js";
import { Products } from "../data/products.js";
import { Sizing } from "../data/SizeGuide.js";
import { loadCartValue } from "./shared/header.js";
import { renderDialog, showDialog } from "./shared/modal.js";

const products = new Products('Products');
const inventory = new Inventory('Inventory');
const cart = new Cart('Order');
const attributeValues = new AttributeValues('AttributeValue');
const sizeGuide = new Sizing();

let FOUR_SUB_HEADINGS = [{
  id:0,
  name: 'Description',
}, {
  id:1,
  name: 'Sizing',
}

];
let quantity = 0;
let variantQuantity = 0;
let quantityElem;
const url = new URL(window.location.href);
export const inventoryId = url.searchParams.get('id');
const itemInventory = inventory.getMatchingItemInInventory(inventoryId);
const product = products.getMatchingItem(itemInventory.productId);
const allProducts = inventory.getAllItem(itemInventory.productId);
const sizeValues = [];
const variantValues = [];
let matchingItem;

console.log(product);

allProducts.forEach((values) => {
  if(values.productId === itemInventory.productId) {
    if(values.attributes.colorId === itemInventory.attributes.colorId) {
      sizeValues.push(values);
    } else {
      if(!matchingItem)
        variantValues.push(values);
      matchingItem = variantValues.find(v => v.inventoryId === values.inventoryId);
    } 
  }
});

document.querySelector('.title').innerText = product.name;
const price = product.price;
const markup = product.markup;
const totalPrice = Number(price) + Number(markup);

let viewHTML = '';
const viewElem = document.querySelector('.view-main-content');

function generateHTML() {
  loadCartValue();
  viewHTML = `
    <div>
      <img class = "w-auto object-contain" src="${itemInventory.image}" alt="">
    </div>
    <div class="text-primary flex flex-col gap-5">
      <section class="flex flex-wrap justify-between items-center">
        <p class="font-extrabold text-4xl">${product.name}</p>
        <p class="font-extralight text-2xl">${products.displayPrice(totalPrice)} AUD</p>
      </section>
      <section class="flex item-center gap-2 mb-5">
        <p class="bg-stone-400 rounded-md px-2 py-1 text-white text-xs font-light">New Arrival</p>
        <p class="bg-stone-950 rounded-md px-2 py-1 text-white text-xs font-light">Sold out</p>
      </section>
      <section class="flex flex-col gap-2">
        <p class="text-xs font-extralight tracking-tight">select variant: </p>
        <div class="js-variant-container flex flex-wrap gap-2 ">
           
        </div>
      </section>
      <section>
        <p class="text-sm font-light"></span></p>
      </section>
      <section>
        <p class="mb-2 text-xs font-extralight tracking-tight">select size:</p>
        <div class="flex js-size-container flex-wrap gap-0.5 mb-1">
          
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
        <p class="js-stocks-notice mb-1 text-xs font-extralight tracking-tight hidden text-red-500">Limited stocks remaining.</p>
      </section>
      <button class="js-add-to-cart-btn border py-2 w-auto lg:w-2/4">
        ADD 
      </button>
      <section class="flex flex-col gap-2">
        <div class="js-subheadings-container flex gap-7 text-sm font-semibold border-b-2 border-gray-300 lg:w-2/4">
        </div>
        <section class = "js-subheading-content-container lg:w-2/4">

        </section>
      </section>
       
    </div>
  `;

  viewElem.innerHTML = viewHTML;
  generateSubHeadings();
  addToCartControl();
  displayVariant();
}

generateHTML();

function generateSubHeadings() {
  const container = document.querySelector('.js-subheadings-container');
  let containerHTML = '';
  FOUR_SUB_HEADINGS.forEach((value) => {
    containerHTML += `
      <button class="js-subheadings data-[active=true]:border-b-2 data-[active=true]:pb-2" data-subheading-Id = ${value.id}>${value.name}</button>
    `;
  });
  container.innerHTML = containerHTML;
  initSubheadings();
}

function initSubheadings(){
  const subheaders = document.querySelectorAll('.js-subheadings');
  subheaders.forEach((subheader) => {
    subheader.addEventListener('click', () => {
      subheaders.forEach(b => b.dataset.active = 'false');
      subheader.dataset.active = true;
      generateSubheadingContent(subheader.dataset.subheadingId);
    });
  });

  const buttonElem = document.querySelectorAll('.js-size');
  buttonElem.forEach((sizeButton) => {
    sizeButton.addEventListener('click', () => {
      buttonElem.forEach(b => b.dataset.active = 'false');
      sizeButton.dataset.active = true;
      updateSelectedVariant(sizeButton.dataset.id);
    });
  });
  
  if(subheaders.length){
    subheaders[0].dataset.active = true;
    generateSubheadingContent(0);
  }
}


function generateSubheadingContent(subheadingId){
  const container = document.querySelector('.js-subheading-content-container');
  let containerHTML = '';
  if(Number(subheadingId) === 0)
    containerHTML = generateSubDescription();
  if(Number(subheadingId) === 1)
    containerHTML = generateSizeGuide();

  container.innerHTML = containerHTML;
}

function generateSubDescription() {
  return `
    <div class="flex flex-col gap-2">
      <header class="text-base font-semibold">  
        ${product.descriptionHeader}
      </header>
      <content class="text-xs">
        ${product.description}
      </content>
      <section class = "font-medium">
        ${product?.details ?? ''}
      </section>
      <section class = "font-medium">
        ${product?.spec ?? ''}
      </section>
    </div>
  `;
}

function formatSize(v) {
  if (v.size) return v.size;
  return `${v.oversized} for oversized fit; ${v.right} for right fit`;
}

function generateSizeGuide(){
  let html = '';
  const allGuides = [
    { title: "Male Tops:", data: sizeGuide.MALE_TOP_GUIDE },
    { title: "Male Bottoms:", data: sizeGuide.MALE_BUTTOMS_GUIDE },
    { title: "Female Tops:", data: sizeGuide.FEMALE_TOPS_GUIDE },
    { title: "Female Bottoms:", data: sizeGuide.FEMALE_BOTTOMS }
  ];

  allGuides.forEach(guide => {
    html += `
      <h3 class="font-semibold text-sm">${guide.title}</h3>
    `;

    guide.data.forEach(v => {
      html += `
        <div>
          <p class="text-xs">${v.range}: ${formatSize(v)}</p>
        </div>
      `;
    });

    html += `<div class ="mb-2"></div>`
  });

  html += `
    <footer class="flex items-center gap-1">
      <p class="text-sm font-semibold">
        NOTE:
        <span>
          Sizing above is only applicable based on height. Sizing for different weight varies. 
          If you prefer a more oversized fit, we suggest taking one size bigger.
        </span>
      </p>
    </footer>
  `;
  
  return html;
}



function addToCartControl() {
  const addToCartElem = document.querySelector('.js-add-to-cart-btn');
  
  addToCartElem.addEventListener('click', () => {
    quantity = quantityElem.value;
    cart.addToCart(itemId, quantity);
    loadCartValue();
    renderDialog();   
  });
}

function displayVariant() {
  const container = document.querySelector('.js-variant-container');
  let containerHTML = '';

  variantValues.forEach((variant) => {
    containerHTML += `
      <div class ="js-view-variant size-15  border data-[active=true]:border-black" data-inventory-Id = ${variant.inventoryId}>
        <img class="w-full h-full" src="${variant.image}" alt="">
      </div>
    `;
  });

  container.innerHTML = containerHTML;
  viewVariant();
}

function viewVariant() {
  const viewElem = document.querySelectorAll('.js-view-variant');
  viewElem.forEach((viewButton) => {
    viewButton.addEventListener('click', () => {
      viewElem.forEach(b => b.dataset.active = 'false');
      viewButton.dataset.active = true;
      const inventoryId = viewButton.dataset.inventoryId;
      window.location.href = `/html/view-item/view-item.html?id=${inventoryId}`;
    });
  });
}

function displaySizes() {
  const container = document.querySelector('.js-size-container');
  let containerHTML = '';
  containerHTML = sizeValues.map((variant) => {
    const attribute = attributeValues.getAttributeValues(variant.attributes.sizeId).attributeValue;
    return `
      <button class="js-size border border-gray-200 px-3 py-1 data-[active=true]:border-black" data-id="${variant.inventoryId}" 
      data-qty="${variant.quantity}" data-threshold="${variant.threshold}">
        ${attribute}
      </button>
    `;
  }).join("");

  container.innerHTML = containerHTML;
  selectSizeAndVariant();
}

displaySizes();

function selectSizeAndVariant() {
  const buttonElem = document.querySelectorAll('.js-size');
  buttonElem.forEach((sizeButton) => {
    sizeButton.addEventListener('click', () => {
      buttonElem.forEach(b => b.dataset.active = 'false');
      sizeButton.dataset.active = true;
      updateSelectedVariant(sizeButton.dataset.id);
    });
  });
}

function updateSelectedVariant(inventoryId) {
  const threshold = document.querySelector('.js-stocks-notice');
  quantityElem = document.querySelector('.js-quantity');
  quantityElem.value = 1;

  let matchingItem = sizeValues.find(v => v.inventoryId === Number(inventoryId));
  if(!matchingItem) return;

  if(matchingItem.quantity === matchingItem.threshold) 
    threshold.classList.remove('hidden');
  else 
    threshold.classList.add('hidden');

  
  variantQuantity = matchingItem.quantity;
}

initQuantityControl();

function initQuantityControl() {
  const addElem = document.querySelector('.js-quantity-add-btn');
  const minusElem = document.querySelector('.js-quantity-minus-btn');
  quantityElem = document.querySelector('.js-quantity');

  addElem.addEventListener('click', () => {
    if(variantQuantity > quantityElem.value)
      quantityElem.value++;
  });
  minusElem.addEventListener('click', () => {
    if(quantityElem.value > 1)
      quantityElem.value--;
  });
}
