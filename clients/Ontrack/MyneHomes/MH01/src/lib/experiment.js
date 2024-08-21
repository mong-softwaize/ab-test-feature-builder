import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { onUrlChange, pollerLite } from './helpers/utils';
import element from './components/element';

const { ID, VARIATION } = shared;
const DOM_INTERVAL = 2000;

const init = () => {
  // if (document.querySelector(`.${ID}__element`)) {
  //   document.querySelector(`.${ID}__element`).remove();
  // }

  document.body.insertAdjacentHTML('beforeend', element(ID));
};

export default () => {
  setup(); //use if needed

  const isListenerAdded = document.body.dataset[`${ID}__isListenerAdded`];
  if (!isListenerAdded) {
    document.body.addEventListener('click', (e) => {
      if (!window.location.pathname.includes('/listings/')) return;
      const { target } = e;

      if (target.closest('button[data-ontrack-id="request-expose-button"]')) {
        console.log('main operation started');
        pollerLite(['#headlessui-portal-root .grid-flow-row', '#headlessui-portal-root input[value="Submit"]'], () => {
          console.log('insert element');
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
