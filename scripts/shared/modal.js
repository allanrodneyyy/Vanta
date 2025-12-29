export function renderDialog() {
  const dialogContElem = document.querySelector('.dialog-container');

  const dialogHTML = `
    <dialog class = "cart-dialog w-[90%] lg:w-[30%] rounded backdrop:bg-gray-900/50 fixed bottom-4 right-4 m-0 inset-auto ">
      <form class = "cart-dialog-container" method="dialog">
        <div class="dialog-main-content p-5 flex flex-col gap-5 lg:gap-7">
          
          <header class="flex items-center gap-2 p-3 bg-green-100 justify-center">
            <img class="size-5" src="/resources/check.png" alt="">
            <p class="text-green-700 text-xs">Added to your cart!</p>
          </header>
          <div class="flex items-center gap-5">
            <img class="size-24" src="/resources/product-image/BOX-TEE-BLACK-FRONT.webp" alt="">
            <section class="flex flex-col gap-1">
              <p class="font-bold text-sm">Zip Flush Hoodie</p>
              <p class="font-normal text-sm">$167 AUD</p>
              <p class="font-normal text-sm">S</p>
            </section>
          </div>
          <footer class="grid grid-cols-2 gap-2">
            <button class = "dialog-view-cart-btn border p-3 rounded-xl text-xs font-semibold">View cart</button>
            <button class = "js-dialog-delete-button  dialog-delete-button border p-3 bg-stone-900 rounded-xl text-xs font-semibold text-white">Checkout</button>
          </footer>
        </div>
      </form>
    </dialog>
  `
  dialogContElem.innerHTML = dialogHTML;
}

export function showDialog() {
  const dialogElem = document.querySelector('.cart-dialog');

  dialogElem.showModal();
  dialogElem.addEventListener('click', (e) => {
    const rect = dialogElem.getBoundingClientRect();
    const clickOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (clickOutside) {
      dialogElem.close();
    }
  });
  
  setTimeout(() => {
    dialogElem.close();
  }, 2000)

  toCart();
}

export function toCart() {
  const viewElem = document.querySelector('.dialog-view-cart-btn');

  viewElem.addEventListener('click', () => {
    window.location.href = "/html/cart/cart.html";
  });
}