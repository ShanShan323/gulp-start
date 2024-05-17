import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

console.log(document.querySelector('.slide-banner__swiper'))
const swiper = new Swiper('.slide-banner__swiper', {
    
    // Optional parameters
    direction: 'horizontal',//ориентация слайдера
    loop: true,//зацикленность
  
    // If we need pagination
    pagination: {//пагинация
      el: '.slide-banner__pagination',
      bulletActiveClass: 'pagination__item--big',
      bulletClass: 'pagination__item',
    },
  
    // Navigation arrows
    navigation: {//навигация вперед и назад
      nextEl: '.slide-banner__swap--right',
      prevEl: '.slide-banner__swap--left',
    },
  });
console.log(document.querySelector('.slide-banner__swiper'))
