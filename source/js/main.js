import { arrayOfProduct } from './fetchProduct.js';
import renderProducts from './renderProducts.js';

const productWrapper = document.querySelector('.best-selling__product-wrapper');
const productTemplate = document.querySelector('#product').content;

renderProducts ( arrayOfProduct, productTemplate, productWrapper, false, 'best-selling__product');
