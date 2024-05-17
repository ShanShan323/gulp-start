import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiper = new Swiper('.slide-banner__swiper', {
    
    direction: 'horizontal',
    loop: true,
  
    pagination: {
      el: '.slide-banner__pagination',
      bulletActiveClass: 'pagination__item--big',
      bulletClass: 'pagination__item',
    },
  
    navigation: {
      nextEl: '.slide-banner__swap--right',
      prevEl: '.slide-banner__swap--left',
    },
  });
