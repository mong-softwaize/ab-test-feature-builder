import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { calculateSellPrice, observeDOM, pollerLite } from './helpers/utils';
import { button, buttonV2 } from './components/button';

const { ID, VARIATION } = shared;

const updateDom = (percentage, oldPrice, sellPrice) => {
  document.querySelector(`.${ID}__checkboxBtn`).remove();
  const targetPoint = document.querySelector('.Section--bundle-checkout .Container > .inner');
  if (!document.querySelector(`.${ID}__checkboxBtn`)) {
    targetPoint.insertAdjacentHTML(
      'afterend',
      VARIATION === '1' ? button(ID, percentage, oldPrice, sellPrice) : buttonV2(ID, oldPrice, sellPrice)
    );
  }

  const checkoutBtn = document.querySelector(`.${ID}__checkboxBtn button`);
  if (!checkoutBtn.querySelector(`.${ID}__messageContainer`)) {
    checkoutBtn.insertAdjacentElement('afterend', window[`${ID}__cloneNodeElement`]);
  }
};

const calculationFn = (indicator = 0) => {
  const checkoutBtn = document.querySelector('.Section.Section--bundle-summary button[type="submit"]');
  const oldPrice = parseFloat(checkoutBtn.innerText.toLowerCase().split('checkout: $')[1].replace(/,/g, ''));

  let percentage;
  let sellPrice;

  if (indicator === 1) {
    percentage = '';
  } else if (indicator === 2) {
    percentage = '10% OFF';
    sellPrice = calculateSellPrice(oldPrice, 10);
  } else if (indicator === 3) {
    percentage = '15% OFF';
    sellPrice = calculateSellPrice(oldPrice, 15);
  } else {
    percentage = '';
  }

  updateDom(percentage, oldPrice, sellPrice);
};

const init = () => {
  const targetPoint = document.querySelector('.Section--bundle-checkout .Container > .inner');
  if (!document.querySelector(`.${ID}__checkboxBtn`)) {
    targetPoint.insertAdjacentHTML('afterend', VARIATION === '1' ? button(ID) : buttonV2(ID));
  }

  const messageContainer = document.querySelector('.redo-message-container');
  messageContainer.classList.add(`${ID}__messageContainer`);
  window[`${ID}__cloneNodeElement`] = messageContainer;
  const checkoutBtn = document.querySelector(`.${ID}__checkboxBtn button`);
  if (!checkoutBtn.querySelector(`.${ID}__messageContainer`)) {
    checkoutBtn.insertAdjacentElement('afterend', messageContainer);
  }

  const callBackHandler = (mutation) => {
    const { target } = mutation;

    let timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      const parentElement = targetPoint.querySelector('.BundleProgressBar');
      const childList = Array.from(parentElement.childNodes);
      const unlockedList = Array.from(parentElement.querySelectorAll('.unlocked'));
      const index =
        unlockedList.length >= 1 &&
        childList.findIndex((item) => {
          const lastUnlockedElement = unlockedList[unlockedList.length - 1];
          return item == lastUnlockedElement.closest('.BundleProgressBar__tier');
        });

      calculationFn(index);
    }, 1000);
  };

  observeDOM('.Section.Section--bundle-summary .Loop', callBackHandler);
};

export default () => {
  setup(); //use if needed

  if (VARIATION === 'control') return;

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__Button`)) {
      document.querySelector('.Section.Section--bundle-summary button[type="submit"]').click();
    }
  });

  init(); //
};
