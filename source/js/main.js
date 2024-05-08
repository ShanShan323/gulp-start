import { getApi } from './getApi.js';
import renderProducts from './renderProducts.js';

const productWrapper = document.querySelector('.best-selling__product-wrapper');
const productTemplate = document.querySelector('#product').content;

const arrayOfProduct = await getApi('https://zsa-studio.ru/catalog.php');
renderProducts ( arrayOfProduct, productTemplate, productWrapper, false, 'best-selling__product');
