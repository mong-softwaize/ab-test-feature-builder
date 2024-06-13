import setup from './services/setup';

import shared from './shared/shared';

import colorStr from './components/colorStr';
//eslint-disable-next-line import/named
import { colorSwatches } from './data/data';

const { ID } = shared;

export default () => {
  setup(); //use if needed

  const colorSection = document
    .querySelector('template[x-for="(value, index) in colors"]')
    .closest('.product-materials-grid');

  colorSection.closest('.product-materials-block').classList.add(`${ID}__hidden`);

  const colorElements = [...colorSection.querySelectorAll('label.product-materials-button')];

  if (document.querySelector(`.${ID}__color-swatch`)) {
    document.querySelector(`.${ID}__color-swatch`).remove();
  }

  const sizeContainer = document.querySelector('.product-size-block');

  if (document.querySelector(`.${ID}__color-swatch`)) return;

  sizeContainer.insertAdjacentHTML('beforebegin', colorStr(ID, colorElements));

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest(`.${ID}__color-item`)) {
      const clickedElem = target.closest(`.${ID}__color-item`);
      const { value } = clickedElem.dataset;
      document.querySelectorAll(`.${ID}__color-item`).forEach((item) => {
        if (item.getAttribute('style')) {
          item.removeAttribute('style');
        }
      });
      clickedElem.style.cssText = `
        border: solid 2px ${colorSwatches[value]};
      `;
      document
        .querySelector(`label.product-materials-button input[value="${value}"]`)
        .parentElement.click();
    }
  });
};
