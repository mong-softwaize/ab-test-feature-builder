import setup from './services/setup';
import { observeDOM } from './helpers/utils';
import shared from './shared/shared';
import { calculateBox } from './components/calculateBox';
import { fpCalculator } from './components/fpCalculator';
import { checkBox } from './components/checkBox';
import { deliveryMessage } from './components/deliveryMessage';
import { priceWrapperV4, priceWrapperV5, priceWrapperV6 } from './components/priceWrapper';
import renderModal from './helpers/renderModal';

const { ID, VARIATION } = shared;
//const DOM_RENDER_DELAY = 2000;
const finalMessage = 'Order a Free Sample';

const renderPriceSection = () => {
  const priceElement = document.querySelector('.product-info-price');
  const sellPrice = priceElement
    .querySelector('.final-price > .price-including-tax:last-child')
    .innerText.trim();
  const comparePrice = priceElement
    .querySelector('.old-price > .price-including-tax:last-child')
    ?.innerText.trim();
  const orderASampleElement = document.querySelector('.product-info-main .sample-add-form');

  const renderSampleElement = (element) => {
    element.insertAdjacentElement('beforeend', orderASampleElement);
  };

  const textChangeHandler = (element) => {
    //eslint-disable-next-line no-param-reassign
    element.querySelector('button > span').innerText = finalMessage;
  };

  if (VARIATION === '4' || VARIATION === '1') {
    if (document.querySelector(`.${ID}__priceWrapper`)) {
      document.querySelector(`.${ID}__priceWrapper`).remove();
    }
    priceElement.insertAdjacentHTML('beforebegin', priceWrapperV4(ID, sellPrice, comparePrice));
    const orderSampleWrapper = document.querySelector(`.${ID}__orderSampleWrapper-button`);
    renderSampleElement(orderSampleWrapper);
    textChangeHandler(orderSampleWrapper);
  }

  if (VARIATION === '5' || VARIATION === '2') {
    if (document.querySelector(`.${ID}__priceWrapper`)) {
      document.querySelector(`.${ID}__priceWrapper`).remove();
    }
    priceElement.insertAdjacentHTML('beforebegin', priceWrapperV5(ID, sellPrice, comparePrice));
    const orderSampleWrapper = document.querySelector(`.${ID}__orderSampleWrapper-button`);
    renderSampleElement(orderSampleWrapper);
    textChangeHandler(orderSampleWrapper);
  }

  if (VARIATION === '6' || VARIATION === '3') {
    if (document.querySelector(`.${ID}__priceWrapper`)) {
      document.querySelector(`.${ID}__priceWrapper`).remove();
    }
    priceElement.insertAdjacentHTML('beforebegin', priceWrapperV6(ID, sellPrice, comparePrice));
    const orderSampleWrapper = document.querySelector(`.${ID}__orderSampleWrapper-button`);
    renderSampleElement(orderSampleWrapper);
    textChangeHandler(orderSampleWrapper);
    //priceElement insertion
    const priceContainer = document.querySelector(`.${ID}__priceContainer`);
    priceContainer.insertAdjacentElement('afterend', priceElement);
  }

  //const renderText = (mutation) => {
  //const { addedNodes, target } = mutation;
  //const orderSampleButton = document.querySelector(
  //`.${ID}__orderSampleWrapper-button button > span`
  //);

  //if (addedNodes.length > 0 && target.innerText.toLowerCase() === 'order a sample') {
  //setTimeout(() => {
  //orderSampleButton.innerText = finalMessage;
  //}, DOM_RENDER_DELAY);
  //}
  //};

  //text chnage handler
  //observeDOM('#product-addtocart-button1 span', renderText);
  observeDOM('.missing-wastage', () => {
    const missingDetails = document.querySelector('.missing-wastage');
    const wastageCheckbox = document.querySelector(`.${ID}__checkBox`);
    const isMissingDetailsHidden = missingDetails.getAttribute('style') === 'display: none;';
    if (isMissingDetailsHidden) {
      wastageCheckbox.classList.add(`${ID}__hide`);
    } else {
      wastageCheckbox.classList.remove(`${ID}__hide`);
    }
  });
};

export default () => {
  if (!document.documentElement.classList.contains('lf167')) {
    setup();
  }

  //render modal
  renderModal(ID);

  //render price section
  renderPriceSection();
  const targetElement = document.querySelector('.product-info-main .product-info-cta');
  const deliveryDataElem = document.querySelector('.del_date');
  const deliveryData = deliveryDataElem ? deliveryDataElem?.innerText : '';

  if (document.querySelector(`.${ID}__calculateBox`)) {
    document.querySelector(`.${ID}__calculateBox`).remove();
  }
  targetElement && targetElement.insertAdjacentHTML('afterend', calculateBox(ID, deliveryData));

  const inputElem = document.querySelector(`.${ID}__input-box input`);
  const controlInputElement = document.querySelector('.fp-calculator .fp-controls input');

  controlInputElement.addEventListener('input', () => {
    if (controlInputElement.value === '' || controlInputElement.value === '0') {
      document.querySelector(`.${ID}__calculateBox`).classList.remove(`${ID}__hide`);
      inputElem.value = '';
      inputElem.focus();
    }
  });

  inputElem.addEventListener('input', () => {
    //const areaInput = document.querySelector('.fp-calculator .fp-controls input');
    controlInputElement.value = inputElem.value;
    controlInputElement.dispatchEvent(new Event('change'));

    if (inputElem.value > '0') {
      document.querySelector(`.${ID}__calculateBox`).classList.add(`${ID}__hide`);
      controlInputElement.focus();
    }
  });

  const fpControls = document.querySelector('.fp-controls');
  const fpRequire = document.querySelector('.fp-require');
  const fpTotalAmount = document.querySelector('.fp-require-statement:not(.-bold)');

  if (document.querySelector(`.${ID}__fpCalculator`)) {
    document.querySelector(`.${ID}__fpCalculator`).remove();
  }
  fpRequire.insertAdjacentHTML('afterbegin', fpCalculator(ID));
  const fpCalculatorInputBox = document.querySelector(`.${ID}__fpCalculator-input`);
  const fpCalculatorTotalBox = document.querySelector(`.${ID}__fpCalculator-calculation`);
  fpCalculatorInputBox.querySelector('p').insertAdjacentElement('afterend', fpControls);
  fpCalculatorTotalBox.querySelector('p').insertAdjacentElement('afterend', fpTotalAmount);
  if (fpCalculatorTotalBox.querySelector(`.${ID}__checkBox`)) {
    fpCalculatorTotalBox.querySelector(`.${ID}__checkBox`).remove();
  }
  fpCalculatorTotalBox
    .querySelector('p[data-bind="text: total_info"]')
    .insertAdjacentHTML('beforebegin', checkBox(ID));

  if (fpRequire.querySelector(`.${ID}__delivery-message`)) {
    fpRequire.querySelector(`.${ID}__delivery-message`).remove();
  }

  fpRequire
    .querySelector('.product-add-form')
    .insertAdjacentHTML('afterend', deliveryMessage(ID, deliveryData));

  document.body.addEventListener('change', (e) => {
    const { target } = e;

    const wastageDetails = document.querySelector('.wastage-details');
    if (target.matches('#add-10percent-wastage')) {
      wastageDetails.querySelector('.missing-wastage').click();
    }
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    const overlay = document.querySelector(`.${ID}__overlay`);
    const modal = document.querySelector(`.${ID}__modal`);

    if (target.closest(`.${ID}__calculator-openner`)) {
      overlay.classList.remove(`${ID}__hide`);
      modal.classList.remove(`${ID}__hide`);
    } else if (target.closest(`.${ID}__close`) || target.closest(`.${ID}__overlay`)) {
      overlay.classList.add(`${ID}__hide`);
      modal.classList.add(`${ID}__hide`);
    }
  });

  const tooltipToggle = document.querySelector('.tooltip-toggle');
  tooltipToggle.addEventListener('mouseover', () => {
    const tooltipContent = document.querySelector('.tooltip-contents');
    tooltipContent.classList.remove(`${ID}__hide`);
  });

  tooltipToggle.addEventListener('mouseout', () => {
    const tooltipContent = document.querySelector('.tooltip-contents');
    tooltipContent.classList.add(`${ID}__hide`);
  });
};
