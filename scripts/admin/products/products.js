import { Attributes } from "../../../data/Attributes.js";
import { Products } from "../../../data/Products.js";
import { Subcategory } from "../../../data/Subcategory.js";
import { Types } from "../../../data/Types.js";
import { fieldChecker } from "../../shared/fieldcheck.js";
import { deleteDialog, renderModalProduct, toast, populateCategoryDropdown } from "../shared/admin-modal.js";

const products = new Products('Products');
const subcategory = new Subcategory('Subcategory');
const category = new Attributes('Category');
const types = new Types('Type');
let attributeSelectElem;
let subcategoryElem;
let typeSelectElem;

function renderProducts(data) {
  const container = document.querySelector('.products-container');
  let containerHTML = '';

  data.forEach((items) => {
  containerHTML += 
  `
    <tr class="hover:bg-gray-50">
      <td class="border-b border-l border-gray-300 px-4 py-2">${items.id}</td>
      <td class="border-b border-gray-300 px-4 py-2">
      ${subcategory.getMatchingSubcategory(items.subcategoryId)?.attributeValue || ''} / ${types.getMatchingType(items.typeId)?.typeName || ''}
      </td>
      <td class="max-w-[150px] truncate border-b border-gray-300 px-4 py-2">${items.description}</td>
      <td class="border-b border-gray-300 px-4 py-2">${category.getMatchingAttribute(items.categoryId)?.name || ''}</td>
      <td class="border-b border-r border-gray-300 px-4 py-2 ">
        <button class="js-view-button block cursor-pointer" data-product-id=${items.id}>
          View
        </button>
        <button class="js-delete-button cursor-pointer" data-product-id=${items.id}>
          Delete
        </button>
      </td>
    </tr>
  `
 });
 container.innerHTML = containerHTML;
 initActions();
}

renderProducts(products.searchProduct(''));
function initActions(){
  const viewElem = document.querySelectorAll('.js-view-button');
  viewElem.forEach((viewButton) => {
    viewButton.addEventListener('click', () => {
      const itemId = viewButton.dataset.productId;
    });
  });

  const deleteElem = document.querySelectorAll('.js-delete-button');
  deleteElem.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const itemId = deleteButton.dataset.productId;
      deleteDialog();
      deleteProduct(itemId);
    });
  });
}

const addProductElem = document.querySelector('.js-add-product');
addProductElem.addEventListener('click', () => {
  renderModalProduct();
  populateCategoryDropdown();
  initDropdowns();
  const addNewProduct = document.querySelector('.js-add-new-product');
    addNewProduct.addEventListener('click', () => {
      validateUserInput();
    });
});

function validateUserInput() {
  const name = document.querySelector('.js-product-name').value;
  const descriptionHeader = document.querySelector('.js-description-header').value;
  const description = document.querySelector('.js-product-description').value;
  const priceElem = document.querySelector('.js-product-price');
  const price = priceElem.dataset.value;
  const markupElem = document.querySelector('.js-product-markup');
  const markup = markupElem.dataset.value;
  const categoryId = attributeSelectElem.value;
  const subcategoryId = subcategoryElem.value;
  const typeId = typeSelectElem.value

  const tempValue = [name, categoryId , subcategoryId, price, markup, descriptionHeader, description];
  const result = fieldChecker(tempValue);

  if(result) {
    products.insertProducts({
      id: Math.random(),
      name,
      categoryId,
      subcategoryId,
      price,
      markup,
      typeId: typeId || null,
      descriptionHeader,
      description
    });
    toast('Add product');
    renderProducts(products.searchProduct(''));
  }
}

function deleteProduct(itemId) {
  const deleteElem = document.querySelector('.js-delete-product');
  deleteElem.addEventListener('click', () => {
    const result = products.deleteProduct(itemId);
    if(result) {
      toast('Deleted ');
      renderProducts(products.searchProduct(''));
    }
  });
}

searchProduct();

function searchProduct() {
  const searchElem = document.querySelector('.js-search-product');

  searchElem.addEventListener('input', () => {
    const value = searchElem.value.trim();
    if(value === '')
      renderProducts(products.searchProduct(''));
    else 
      renderProducts(products.searchProduct(value));
  });
}

function populateDropdown(dropdown, data) {
  dropdown.innerHTML = '';
  data.forEach((value, index) => {
    let optionElem = document.createElement('option');
    optionElem.text = value.attributeValue || value.typeName;
    optionElem.value = value.id;
    dropdown.add(optionElem);
  });
}

function initDropdowns() {
  attributeSelectElem = document.querySelector('.js-attribute-name');
  subcategoryElem = document.querySelector('.js-product-subcategory');
  typeSelectElem = document.querySelector('.js-product-type');

 attributeSelectElem.addEventListener('change', () => {
   populateDropdown(subcategoryElem, subcategory.getSubcategoryByCatId(attributeSelectElem.value));
   typeSelectElem.innerHTML = '';
 });
 subcategoryElem.addEventListener('change', () => {
    populateDropdown(typeSelectElem, types.getTypeBasedOnSubcategory(subcategoryElem.value));
 });
}


