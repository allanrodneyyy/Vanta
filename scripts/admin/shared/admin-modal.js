//PRODUCTS DIALOG
//ADD PRODUCT DIALOG
let dialogProductElem;
export function renderModalProduct() {
  const dialogContainer = document.querySelector('.add-products-dialog');

  dialogContainer.innerHTML = 
  `
    <form class = "cart-dialog-container"  method="dialog">
      <header class="flex justify-between border-b border-b-gray-300 pb-5">
        <p>Create new product</p>
        <button>
          X
        </button>
      </header>
      <div class="grid grid-cols-2 gap-4 mt-5">
        <section class="col-span-2 flex flex-col gap-1">
          <label for="product-name">Product Name</label>
          <input class="js-product-name border p-1 border-gray-300" type="text" name="product-name" id="">
          <section class="flex gap-1 items-center mt-2 js-field-0 hidden text-xs font-light text-red-500">
            <img class="size-4" src="/resources/mark.png" alt="">
            <p class="">Product name is required.</p>
          </section>
        </section>
        <section class="col-span-2 sm:col-span-1 flex flex-col gap-1">
          <label for="product-type">Product Type</label>
          <select id="product-type" class="js-product-type border p-1 border-gray-300">
              <option selected value="">Select type</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
          </select>
          <section class="flex gap-1 items-center mt-2 js-field-1 hidden text-xs font-light text-red-500">
            <img class="size-4" src="/resources/mark.png" alt="">
            <p class="">Product type is required.</p>
          </section>
        </section>
        <section class="col-span-2 sm:col-span-1 flex flex-col gap-1">
          <label for="product-cat">Category</label>
          <select id="product-cat" class="js-product-category border border-gray-300 p-1">
              <option selected value="">Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
          </select>
          <section class="flex gap-1 items-center mt-2 js-field-2 hidden text-xs font-light text-red-500">
            <img class="size-4" src="/resources/mark.png" alt="">
            <p class="">Product category is required.</p>
          </section>
        </section>
        <section class="col-span-2 flex flex-col gap-1">
          <label for="description">Product Description</label>
          <textarea class="js-product-description p-1 border border-gray-300" name="description" id=""></textarea>
          <section class="flex gap-1 items-center mt-2 js-field-3 hidden text-xs font-light text-red-500">
            <img class="size-4" src="/resources/mark.png" alt="">
            <p class="">Product description is required.</p>
          </section>
        </section>
      </div>
      <footer class="flex gap-3 mt-5 pt-5 border-t border-t-gray-300"> 
        <button type="button" class="js-add-new-product bg-blue-600 items-center text-background p-2 flex gap-2">
          <img class="size-5" src="/resources/plus-sign.png" alt="">Add new product
        </button>
        <button class="border border-gray-300 p-2 px-5">
          Cancel
        </button>
      </footer>
    </form>  
  
  `
  showProductsDialog();
}

//PART OF ADD PRODUCT DIALOG
function showProductsDialog() {
  dialogProductElem = document.querySelector('.add-products-dialog');
  dialogProductElem.showModal();
  dialogProductElem.addEventListener('click', (e) => {
    if (e.target === dialogProductElem) dialogProductElem.close();
  });

  dialogProductElem.addEventListener('close', () => {
    dialogProductElem.close();
  });
}
//End of Product dialog

//Toast for adding products
//Start
export function toast(msg) {
  const dialogContElem = document.querySelector('.toast-notif-container');
  const dialogHTML = `
    <dialog class = "toast-notif-product w-[90%] lg:w-[20%] rounded bg-green-100 border-none  fixed bottom-4 right-4 m-0 inset-auto ">
      <form class = "cart-dialog-container" method="dialog">
        <div class="dialog-main-content p-5 flex flex-col gap-5 lg:gap-7">
          <header class="flex items-center gap-2 p-3 justify-center">
            <img class="size-5" src="/resources/check.png" alt="">
            <p class="text-green-700 text-xs">${msg} successful!</p>
          </header>
        </div>
      </form>
    </dialog>
  `
  dialogContElem.innerHTML = dialogHTML;
  displayToast();
}

export function displayToast() {
  const dialogElem = document.querySelector('.toast-notif-product');
  dialogElem.showModal();
  dialogElem.addEventListener('click', (e) => {
    if (e.target === dialogElem) dialogElem.close();
  });

  dialogElem.addEventListener('close', () => {
    dialogElem.remove();
  });
  
  clearTimeout();
  setTimeout(() => {
    dialogElem.close();
  }, 1000);

  if(dialogProductElem)
    dialogProductElem.close();

  if(dialogDeleteProductElem)
    dialogDeleteProductElem.close();

}

//End of toast for product
//Delete toast
//Start
let dialogDeleteProductElem;
export function deleteDialog() {
  const dialogContainer = document.querySelector('.delete-product-dialog');
  let dialogHTML = '';
  dialogHTML = 
  `
    <form class = "delete-dialog-container flex flex-col gap-3 items-center justify-center"  method="dialog">
      <header class="flex items-center justify-center">
        <img class="size-6" src="/resources/delete.png" alt="">
      </header>
      <p class="font-bold text-2xl ">Are you sure?</p>
      <p class="text-gray-500">This action cannot be undone. All values associated with this field will be lost.</p>
      <footer class="flex gap-2 border-t-gray-300"> 
        <button type="button" class="js-delete-product bg-red-600 items-center text-background p-2 flex gap-2">
         Delete field
        </button>
        <button class="border border-gray-300 p-2 px-5">
          Cancel
        </button>
      </footer>
    </form> 
  `
  dialogContainer.innerHTML = dialogHTML;
  showDeleteDialog();
}

//PART OF delete product DIALOG
function showDeleteDialog() {
  dialogDeleteProductElem = document.querySelector('.delete-product-dialog');
  dialogDeleteProductElem.showModal();
  dialogDeleteProductElem.addEventListener('click', (e) => {
    if (e.target === dialogDeleteProductElem) dialogDeleteProductElem.close();
  });

  dialogDeleteProductElem.addEventListener('close', () => {
    dialogDeleteProductElem.close();
  });
}
//end delete dialog