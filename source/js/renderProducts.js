import { addProductToCart } from './productCart.js';

export default (products, template, target, isTargetList = false, templateClass = '') => {

    const fragment = document.createDocumentFragment();

    let productElement = template.querySelector('.best-selling__product');

    if(isTargetList) {
        const node = document.createElement('li');
        node.innerHTML = productElement.innerHTML;

        Array.prototype.forEach.call(productElement.attributes, function( attr ) {
            node.setAttribute( attr.name, attr.value );
        });

        node.classList.add(templateClass);
        productElement = node;
    } 
    
    products.forEach( product => {
        const itemElement = productElement.cloneNode(true);
        const productItem = itemElement.querySelector('.product');
        const imageElement = itemElement.querySelector('.product__image');
        const nameElement = itemElement.querySelector('.product__name');
        const priceElement = itemElement.querySelector('.product__price');
        const oldPriceElement = itemElement.querySelector('.product__old-price');
        const buttonElement = itemElement.querySelector('.product__button');
        const {id, isBig, status, image, name, price, oldPrice} = product;

        buttonElement.addEventListener('click', () => {
            addProductToCart(
                {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                },
                true
            );
        });

        itemElement.dataset.productId = id;
        imageElement.src = image;
        nameElement.textContent = name;
        priceElement.textContent = `${price} ₽`;

        if(oldPrice?.length) {
            oldPriceElement.textContent = `${oldPrice} ₽`;
        }

        if(isBig) {
            productItem.classList.add('product--big');
            itemElement.classList.add('best-selling__product--g-1-3');
            buttonElement.classList.add('product__button--big');
        } else {
            itemElement.classList.add('best-selling__product--small');
        }

        if(status?.length) {
            productItem.classList.add(`product--${status}`);
        }

        fragment.appendChild(itemElement);
    });

    target.innerHTML = '';
    target.appendChild(fragment);
}