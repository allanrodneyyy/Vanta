import { Products } from "../../data/products.js";

const products = new Products;

function renderProduct() {
  const containerElem = document.querySelector('.men-product-container');
  let productHTML = '';

  products.items.forEach((item) => {
    productHTML += `
      <div class="js-view-item group grid gap-2 text-primary text-center" data-product-Id = ${item.id}>
        <div class="relative rounded-lg w-full aspect-4/4 overflow-hidden cursor-pointer" >
          <img src="/${item.image}" class="w-full h-full object-cover"/>
          <button class="js-add-button  bg-background text-primary font-extralight text-sm px-3 py-1 rounded-md
          opacity-0 group-hover:opacity-100 translate-y-2
          transition-all duration-300 group-hover:translate-y-0
          absolute bottom-5 right-5 cursor-pointer" data-product-Id = ${item.id}
          >
           + Quick add
          </button>
        </div>
        <p class="font-semibold text-sm">${item.name}</p>
        <p class="font-light text-sm">$${products.displayPrice(item.priceCents)} AUD</p>
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
    });
  });
}

renderProduct();