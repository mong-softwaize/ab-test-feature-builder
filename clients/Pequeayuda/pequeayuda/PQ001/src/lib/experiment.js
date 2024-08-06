import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { pollerLite, initSwiper, observeDOM } from './helpers/utils';
import { cartIcon } from './assets/icons';
import categories from './components/categories';
import { bannerData, categoryData, uspsWrapperData } from './data/data';
import { bannerWrapper } from './components/bannerWrapper';
import { uspsWrapper } from './components/uspsWrapper';

const { ID, VARIATION } = shared;

const init = () => {
  const headerOnly = document.querySelector('div[data-elementor-type="header"]');
  const header = document.querySelector('div[data-elementor-type="header"] > div[data-element_type="container"]:last-child');
  header.classList.add(`${ID}__header`);
  const mainElement = header.closest('div[data-elementor-type="header"]');

  if (!header.querySelector(`.${ID}__cartIcon`)) {
    pollerLite(['.elementor-hidden-desktop .elementor-button-icon > .elementor-button-icon-qty'], () => {
      header.querySelector('.elementor-button-icon > .elementor-button-icon-qty').insertAdjacentHTML('afterend', cartIcon);
    });
  }

  //category section
  if (!document.querySelector(`.${ID}__categoriesWrapper`)) {
    headerOnly.insertAdjacentHTML('afterend', categories(ID, categoryData));
  }

  //banner section
  if (!document.querySelector(`.${ID}__bannerWrapper`)) {
    pollerLite([() => typeof window.Swiper === 'function'], () => {
      document.querySelector(`.${ID}__categoriesWrapper`).insertAdjacentHTML('afterend', bannerWrapper(ID, bannerData));
      initSwiper(ID);

      if (!document.querySelector(`.${ID}__uspsContainer`)) {
        document.querySelector(`.${ID}__bannerWrapper`).insertAdjacentHTML('afterend', uspsWrapper(ID, uspsWrapperData));
      }
    });
  }

  observeDOM('div[data-elementor-type="header"] .elementor-menu-cart__toggle_wrapper', (mutation) => {
    if (!header.querySelector(`.${ID}__cartIcon`)) {
      pollerLite(['.elementor-hidden-desktop .elementor-button-icon > .elementor-button-icon-qty'], () => {
        header.querySelector('.elementor-button-icon > .elementor-button-icon-qty').insertAdjacentHTML('afterend', cartIcon);
      });
    }
  });
};

export default () => {
  setup(); //use if needed

  if (VARIATION === 'Control') return;

  init(); //
};
