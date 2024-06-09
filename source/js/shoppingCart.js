import { addToStorage, removeFromStorage, getStorage } from './localstorage.js';

class CartData {
    static getdData () {
        return getStorage('cart');
    }

    static getUniqueProductIds() {
      return [...new Set(CartData.getdData()?.map(JSON.stringify))].map(JSON.parse).sort((a, b) => a.id - b.id);
    }
  
    static getTotalPrice() {
      if (!CartData.getdData() || CartData.getdData().length === 0) {
          return 0;
      }
      return CartData.getdData().map(el => Number(el.price)).reduce((a, b) => a + b, 0);
    }
  
    static getTotalAmount(product) {
      return CartData.getdData().reduce((acc, curr) => {
          if (curr.id === product.id) {
              acc++;
          }
          return acc;
      }, 0);
    }
  }

export class ShoppingCart extends CartData {
    static cartCount = document.querySelector('.header__item-counter');

    constructor(idOfCart) {
        super();
        this.fragment = document.createDocumentFragment();
        this.cart = document.querySelector(idOfCart);
        this.targetElement = this.cart.querySelector('.shopping-cart__list');
        this.templateCart = document.querySelector('#shopping-cart-product').content.querySelector(`.shopping-cart__item`);
        this.totalPrice = this.cart.querySelector('.shopping-cart__cost');
        this.amountOfProduct = this.cart.querySelector('.shopping-cart__amount');
    };

    editCart = (node, operation = 'plus') => {
        this.input = node.querySelector('.shopping-cart__count').value;
        this.totalPrice = this.cart.querySelector('.shopping-cart__cost');
        this.amountOfProduct = this.cart.querySelector('.shopping-cart__amount');

        const newValue = operation === 'plus' ? 1 : -1;

        if(Number(this.input) === 0 && operation === 'minus') {
            return;
        }

        node.querySelector('.shopping-cart__count').value = Number(this.input) + newValue;
        this.amountOfProduct.textContent = Number(this.amountOfProduct.textContent) + newValue;
        ShoppingCart.cartCount.textContent = Number(ShoppingCart.cartCount.textContent) + newValue;
        this.totalPrice.textContent = `${CartData.getTotalPrice()} ₽`;
    };

     render () {
        if(!CartData.getdData()?.length) {
            return;
        }

        this.targetElement.innerHTML = '';

        CartData.getUniqueProductIds().forEach(product => {
            const node = this.templateCart.cloneNode(true);
            node.dataset.productId = product.id;
            node.querySelector('.shopping-cart__image').src = product.image;
            node.querySelector('.shopping-cart__name').textContent = product.name;
            node.querySelector('.shopping-cart__count').value = CartData.getTotalAmount(product);
            node.querySelector('.shopping-cart__price').textContent = `${product.price} ₽`;

            node.querySelector('.shopping-cart__minus').addEventListener('click', () => {
                removeFromStorage(product.id, 'cart');
                this.editCart(node, 'minus');
            });

            node.querySelector('.shopping-cart__plus').addEventListener('click', () => {
                addToStorage('cart', product);
                this.editCart(node, 'plus');
            })

            this.fragment.append(node);
        })

        this.targetElement.append(this.fragment);

        this.totalPrice.textContent = `${CartData.getTotalPrice()} ₽`;
        this.amountOfProduct.textContent = CartData.getdData().length;
        ShoppingCart.cartCount.textContent = CartData.getdData().length;
    };
}

