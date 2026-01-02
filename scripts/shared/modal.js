export function renderDialog() {
  const dialogContElem = document.querySelector('.dialog-container');
  const dialogHTML = `
    <dialog class = "view-cart-dialog w-[90%] lg:w-[30%] rounded backdrop:bg-gray-900/50 fixed bottom-4 right-4 m-0 inset-auto ">
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
  showDialog();
}

export function showDialog() {
  const dialogElem = document.querySelector('.view-cart-dialog');

  dialogElem.showModal();
  dialogElem.addEventListener('click', (e) => {
    if (e.target === dialogElem) dialogElem.close();
  });

  dialogElem.addEventListener('close', () => {
    dialogElem.remove();
  });
  
  setTimeout(() => {
    dialogElem.close();
  }, 2000)

  toCart();
}

export function toCart() {
  document.querySelectorAll('.dialog-view-cart-btn')
    .forEach((viewCartElem) => {
      viewCartElem.addEventListener('click', () => {
        window.location.href = "/html/cart/cart.html";
      });
    });
}

export function renderCartDialog() {
  let dialogHTML = '';
  const dialogContElem = document.querySelector('.header-cart-container');
  dialogHTML = `
    <dialog class = "cart-header-dialog w-[90%] lg:w-[25%] flex flex-col border fixed top-5 right-4 m-0 inset-auto backdrop:bg-gray-900/50 ">
      <form class = "cart-dialog-container" method="dialog">
        <div class="dialog-main-content p-5 flex flex-col gap-5 lg:gap-7">
          <div class="grid auto-rows-auto gap-5
            max-h-[50vh] lg:max-h-105
            overflow-y-auto pr-1">
            <section class="flex gap-5 items-center">
              <img class="size-24" src="/resources/product-image/BOX-TEE-BLACK-FRONT.webp" alt="">
              <div class="flex flex-col gap-3">
                <section class="flex flex-col">
                  <p class="text-xs font-light">Vanta</p>
                  <p class="font-bold text-sm">Zip Flush Hoodie</p>
                </section>
                <section class="grid grid-cols-2 gap-x-2 font-normal text-xs items-center">
                  <p class="">Color:</p>
                  <p class="">Black</p>
                  <p class="">Size:</p>
                  <p class="">Medium</p>
                  <p class="">Quantity:</p>
                  <p class="">2</p>
                  <p class="">Total</p>
                  <p class="font-semibold">$200</p>
                </section>
              </div>
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
  `
  dialogContElem.innerHTML = dialogHTML;
  showCartDialog();
}

export function showCartDialog() {
  const dialogElem = document.querySelector('.cart-header-dialog');

  dialogElem.showModal();
  dialogElem.addEventListener('click', (e) => {
    if (e.target === dialogElem) {
      dialogElem.close();
    }
  });

   dialogElem.addEventListener('close', () => {
    dialogElem.remove();
  });
  toCart();
}

export function logInDialog() {
  const dialogContElem = document.querySelector('.login-dialog-container');
  const dialogHTML = `
    <dialog class = "toast-login-dialog w-[90%] lg:w-[20%] rounded bg-green-100 border-none  fixed bottom-4 right-4 m-0 inset-auto ">
      <form class = "cart-dialog-container" method="dialog">
        <div class="dialog-main-content p-5 flex flex-col gap-5 lg:gap-7">
          <header class="flex items-center gap-2 p-3 justify-center">
            <img class="size-5" src="/resources/check.png" alt="">
            <p class="text-green-700 text-xs">Login Successful!</p>
          </header>
        </div>
      </form>
    </dialog>
  `
  dialogContElem.innerHTML = dialogHTML;
  showLoginDialog();
}

export function showLoginDialog() {
  const dialogElem = document.querySelector('.toast-login-dialog');

  dialogElem.showModal();
  dialogElem.addEventListener('click', (e) => {
    if (e.target === dialogElem) dialogElem.close();
  });

  dialogElem.addEventListener('close', () => {
    dialogElem.remove();
  });
  
  setTimeout(() => {
    dialogElem.close();
    window.location.href = `/html/user-page/user-index.html`;
  }, 2000);
}