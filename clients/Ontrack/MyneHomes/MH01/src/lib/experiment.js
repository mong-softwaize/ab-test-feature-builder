import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { onUrlChange, pollerLite } from './helpers/utils';
import element from './components/element';

const { ID, VARIATION } = shared;
const DOM_INTERVAL = 2000;
const HIGHLIGHT_THRESHOLD = 4;

const collectInformation = () => {
  const wrapper = document.querySelector('div[data-ontrack-id="property-title"]');
  const imageSrc = document.querySelector('[data-ontack-id="property-image-carousel-item"] img').src;
  const locationName = wrapper?.querySelector('.text-ocean')?.textContent.trim();
  const hotelName = wrapper?.querySelector('.typo-head-a')?.textContent.trim();
  const pillsBox = document.querySelector('[data-ontrack-id="property-title-pills-box"]').cloneNode(true);
  const priceWrapper = document.querySelector('div[data-ontrack-id="property-price-box"]');
  const price = priceWrapper?.querySelector('span[data-ontrack-id="property-price-value"]')?.textContent.trim();
  const perShare = priceWrapper.querySelector('.flex-col > div.typo-body')?.textContent.trim().replace(',', '');

  const highlightsWrapper = document.querySelector('[data-ontrack-id="property-highlights-list"]');
  const collectHighlightInfo = Array.from(highlightsWrapper.querySelectorAll('.grid')).map((item, index) => {
    if (index <= 4) {
      return item.cloneNode(true);
    }
  });

  return {
    imageSrc,
    locationName,
    hotelName,
    pillsBox,
    price,
    perShare,
    collectHighlightInfo,
  };
};

const init = () => {
  if (document.querySelector(`.${ID}__element`)) {
    document.querySelector(`.${ID}__element`).remove();
  }

  const info = collectInformation();
  document.body.insertAdjacentHTML('beforeend', element(ID, info));
  //collectInformation();
};

export default () => {
  setup(); //use if needed

  const isListenerAdded = document.body.dataset[`${ID}__isListenerAdded`];
  if (!isListenerAdded) {
    document.body.addEventListener('click', (e) => {
      if (!window.location.pathname.includes('/listings/') && !window.location.pathname.includes('/immobilien/')) return;
      const { target } = e;
      const submitValue = window.location.pathname.includes('/de/') ? 'Exposés anfordern' : 'Submit';

      if (target.closest('button[data-ontrack-id="request-expose-button"]')) {
        pollerLite(['#headlessui-portal-root .grid-flow-row', `#headlessui-portal-root input[value="${submitValue}"]`], () => {
          const modalWrapper = document.querySelector('#headlessui-portal-root .grid-flow-row');
          modalWrapper.classList.add(`${ID}__modalWrapper`);
          const element = document.querySelector(`.${ID}__element`);
          const cloneElement = element.cloneNode(true);
          const mainContainer = document.querySelector('#headlessui-portal-root .grid-flow-row');
          mainContainer.insertAdjacentElement('beforeend', cloneElement);
        });
      }
    });
  }

  document.body.dataset[`${ID}__isListenerAdded`] = true;

  if (VARIATION === 'control') return;

  init(); //

  onUrlChange(() => {
    pollerLite(['body', () => window.location.pathname.includes('/listings/')], () => {
      if (!document.documentElement.classList.contains(ID)) {
        setup();
        setTimeout(init, DOM_INTERVAL);
      }
    });
  }); //
};
