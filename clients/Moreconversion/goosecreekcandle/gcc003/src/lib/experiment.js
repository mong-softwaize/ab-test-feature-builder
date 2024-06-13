import setup from './services/setup';
import shared from './shared/shared';
import initSwiper from './helpers/initSwiper';
import { addCssToPage, addJsToPage, addToCart, pollerLite } from './helpers/utils';
import productCards from './components/productCards';
import fetchProducts from './fetchProducts/fetchProducts';

const { ID, VARIATION } = shared;

const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';

const init = () => {
  const isMobile = window.innerWidth < 990 ? 1 : 0;
  const anchorPoint = document.querySelectorAll('.shg-category-grid')[isMobile];
  const getProducts = async () => {
    const products = await fetchProducts();
    const productCardsHTML = `
    <div class="${ID}__bestSellerContainer">
      <div class="${ID}__headerText">Best Sellers</div>
      <div class="${ID}__swiper swiper">
        ${productCards(ID, products)}
      </div>
    </div>`;
    if (!document.querySelector(`.${ID}__productCards`)) {
      anchorPoint.insertAdjacentHTML('afterend', productCardsHTML);
    }
    initSwiper(`.${ID}__swiper`);
  };
  getProducts().then(() => {
    const atcButtons = document.querySelectorAll(`.${ID}__productCards .add-to-cart-ajax`);
    atcButtons.forEach((atcButton) => {
      const btn = atcButton;
      btn.textContent = 'Add to Cart';
    });
  });
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('form') && target.closest(`.${ID}__productCard`)) {
      e.preventDefault();
      const form = target.closest('form');
      const prdId = form.querySelector('input[name="id"]').value;
      addToCart(prdId, 1);
    }
  });

  if (VARIATION === 'control') {
    return;
  }

  addJsToPage(swiperJs, `${ID}__swiperjs`);
  addCssToPage(swiperCss, `${ID}__swipercss`);

  pollerLite(
    [() => typeof window.Swiper === 'function' && window.meta.page.pageType === 'home'],
    () => {
      init();
    }
  );
};
