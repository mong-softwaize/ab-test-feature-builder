import setup from './services/setup';
import shared from './shared/shared';
import { observeIntersection } from './helpers/utils';
import stickyATC from './components/stickyATC';
import handleATC from './handlers/handleATC';

const { ID } = shared;

const intersectionAnchor = document.querySelector('.product-page--submit-action');
const anchorPoint = document.body;

const productImgElem = document.querySelector('.product-single__thumbnail__wrapper img');
const productImg = productImgElem?.getAttribute('src');
const productTitleElem = document.querySelector('.product-info-wrapper h1');
const productTitle = productTitleElem?.textContent.trim();

const productData = {
  productImg,
  productTitle
};

const productDataElem = document.querySelector('.product-json');
const productAllData = JSON.parse(productDataElem.innerHTML);

const priceData = {
  salePrice: productAllData.price,
  compareAtPrice: productAllData.compare_at_price
};

const init = () => {
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const stickySection = document.querySelector(`.${ID}__stickyATCContainer`);
      const chatWidgetDisplay = document.querySelector('#gladlyChat_container');

      let scrollTimer;
      clearTimeout(scrollTimer);
      if (entry.isIntersecting) {
        stickySection.classList.remove(`${ID}__show`);
        stickySection.classList.add('slide-out-bottom');
        document.body.classList.remove('atc-show');
        chatWidgetDisplay && chatWidgetDisplay.classList.add(`${ID}__hide`);

        scrollTimer = setTimeout(() => {
          stickySection.classList.add(`${ID}__hide`);
        }, 250);
      } else if (entry.boundingClientRect.top < 0 && !entry.isIntersecting) {
        document.body.classList.add('atc-show');
        stickySection.classList.remove('slide-out-bottom');
        stickySection.classList.remove(`${ID}__hide`);
        stickySection.classList.add(`${ID}__show`);
        chatWidgetDisplay && chatWidgetDisplay.classList.remove(`${ID}__hide`);
      }
    });
  };

  anchorPoint.insertAdjacentHTML('beforeend', stickyATC(ID, productData, priceData));

  observeIntersection(intersectionAnchor, 0, handleIntersection);

  handleATC(ID);
};

export default () => {
  setup(); //use if needed

  init();
};
