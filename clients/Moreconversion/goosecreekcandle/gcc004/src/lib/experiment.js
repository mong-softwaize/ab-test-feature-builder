import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { prodsStructure } from './components/prodsStructure';
import { contactInfoStr } from './components/contactInfoStr';
import { promoBanner } from './components/promoBanner';
import { pollerLite, timerCountdown } from './helpers/utils';

const { ID } = shared;

export default () => {
  setup(); //use if needed
  gaTracking('Conditions Met'); //use if needed
  console.log(ID);
  //-----------------------------
  //If control, bail out from here
  //-----------------------------
  //if (VARIATION === 'control') {
  //}

  //-----------------------------
  //Write experiment code here
  //-----------------------------
  //...
  const TIME_FOR_COUNTDOWN = 'Dec 02 2023 23:59:00';
  const products = [
    'https://goosecreekcandle.com/products/blueberry-cheesecake-large-3-wick-candle',
    'https://goosecreekcandle.com/products/classic-christmas-tree-large-3-wick-candle',
    'https://goosecreekcandle.com/products/warm-snickerdoodle-large-3-wick-candle'
  ];
  const modifiedProducts = [];
  //console.log('🚀 ~ file: experiment.js:70 ~ cartHrefs', cartHrefs);

  const collectProductInfo = (url, doc) => {
    const prodImage = doc.querySelector('.product-single__thumbnails .product-single__type-image');
    const prodTitle = doc.querySelector(
      '.product-info-wrapper > .product-description-header'
    ).innerText;
    //const reviewElement = doc.querySelector('.product-info-wrapper .oke-sr-stars');
    const reviewCount = doc.querySelector('.product-info-wrapper .oke-sr-count-number').innerText;
    const productSalePricing = doc.querySelector(
      '.product-info-wrapper .product-page--pricing .product-page--pricing--variant-price .money'
    )?.innerText;
    const productComparePricing = doc.querySelector(
      '.product-info-wrapper .product-page--pricing .product-page--pricing--variant-compare-at-price .money'
    )?.innerText;

    modifiedProducts.push({
      img: prodImage,
      title: prodTitle,
      reviewCount,
      salePrice: productSalePricing,
      comparePrice: productComparePricing,
      url
    });
  };

  const parseHTML = async (urls) => {
    const promises = urls.map((url) =>
      fetch(url).catch((error) => {
        console.error(`Error fetching ${url}: ${error.message}`);
        return Promise.resolve(null);
      }));

    const responses = await Promise.all(promises);
    //eslint-disable-next-line no-restricted-syntax
    for (const [index, response] of responses.entries()) {
      console.log('🚀 ~ parseHTML ~ index:', index);
      if (response) {
        //eslint-disable-next-line no-await-in-loop
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        collectProductInfo(response.url, doc);
      }
    }
  };

  parseHTML(products).then(() => {
    if (modifiedProducts.length === 3) {
      console.log('got it');
      if (document.querySelector(`.${ID}__grid__item`)) {
        document.querySelector(`.${ID}__grid__item`).remove();
      }
      document
        .querySelector('.dropdown.mega-menu #images-wrapper > li:last-child > .inner')
        .insertAdjacentHTML('afterend', prodsStructure(ID, modifiedProducts));
    }
  });

  //in mobile
  pollerLite(['#mobile-menu--dev-menu'], () => {
    console.log('got the mobile element');

    if (document.querySelector(`.${ID}__header-promo`)) {
      document.querySelector(`.${ID}__header-promo`).remove();
    }
    if (document.querySelector('#header-promo:not(.countdown-ended)')) {
      document.body.classList.add('countdown-added');
      document
        .querySelector('#mobile-menu--dev-menu > form')
        .insertAdjacentHTML('beforebegin', promoBanner(ID));

      timerCountdown(ID, TIME_FOR_COUNTDOWN);
    }

    if (document.querySelector(`.${ID}__contactInfo`)) {
      document.querySelector(`.${ID}__contactInfo`).remove();
    }
    document
      .querySelector('#mobile-menu--dev-menu')
      .insertAdjacentHTML('beforeend', contactInfoStr(ID));
  });
};
