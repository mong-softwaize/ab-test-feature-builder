import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { pollerLite } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  if (VARIATION === '1') {
    const customDropdown = `<div class="${ID}__dropdownWrapper"><div class="${ID}__dropdownContainer"></div></div>`;
    const targetPoint = document.querySelector('.js-enabled.product__option');
    const controlModal = document.querySelector('.model-size-dropdown');
    if (!document.querySelector(`.${ID}__dropdownWrapper`)) {
      targetPoint.insertAdjacentHTML('afterend', customDropdown);
    }
    document.querySelector(`.${ID}__dropdownContainer`).append(controlModal);
  }
};

export default () => {
  setup(); //use if needed
  console.log(ID);

  if (VARIATION === 'Control') return;

  init(); //
};
