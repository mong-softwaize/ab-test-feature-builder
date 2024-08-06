import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { pollerLite, initSwiper } from './helpers/utils';
import { cartIcon } from './assets/icons';
import categories from './components/categories';
import { bannerData, categoryData, uspsWrapperData } from './data/data';
import { bannerWrapper } from './components/bannerWrapper';
import { uspsWrapper } from './components/uspsWrapper';

const { ID, VARIATION } = shared;

const init = () => {
  const header = document.querySelector('div[data-elementor-type="header"] > div[data-element_type="container"]:last-child');
  header.classList.add(`${ID}__header`);
  const mainElement = header.closest('div[data-elementor-type="header"]');
  console.log('mainElement', mainElement);

  if (!header.querySelector(`.${ID}__cartIcon`)) {
    pollerLite(['.elementor-hidden-desktop .elementor-button-icon > .elementor-button-icon-qty'], () => {
      header.querySelector('.elementor-button-icon > .elementor-button-icon-qty').insertAdjacentHTML('afterend', cartIcon);
    });
  }

  //category section
  if (!document.querySelector(`.${ID}__categoriesWrapper`)) {
    mainElement.insertAdjacentHTML('beforeend', categories(ID, categoryData));
  }

  //banner section
  if (!document.querySelector(`.${ID}__bannerWrapper`)) {
    pollerLite([() => typeof window.Swiper === 'function'], () => {
      mainElement.insertAdjacentHTML('beforeend', bannerWrapper(ID, bannerData));
      initSwiper(ID);

      if (!document.querySelector(`.${ID}__uspsContainer`)) {
        mainElement.insertAdjacentHTML('beforeend', uspsWrapper(ID, uspsWrapperData));
      }
    });
  }
};

export default () => {
  setup(); //use if needed

  if (VARIATION === 'Control') return;

  init(); //
};
