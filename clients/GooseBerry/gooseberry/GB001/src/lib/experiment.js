import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { pollerLite } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = () => {
  if (VARIATION === '1') {
    const customDropdown = `<div class="${ID}__dropdownWrapper"></div>`;
    const targetPoint = document.querySelector('.product__color-chips');
    const controlModal = document.querySelector('.model-size-dropdown');
    if (!document.querySelector(`.${ID}__dropdownWrapper`)) {
      targetPoint.insertAdjacentHTML('beforeend', customDropdown);
    }
    document.querySelector(`.${ID}__dropdownWrapper`).append(controlModal);
  }
};

export default () => {
  setup(); //use if needed
  console.log(ID);

  if (VARIATION === 'Control') return;

  init(); //
};
