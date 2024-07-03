import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { pollerLite } from './helpers/utils';
import { button } from './components/button';

const { ID, VARIATION } = shared;

const init = () => {
  console.log('okk');

  const targetPoint = document.querySelector('.Section--bundle-checkout .Container > .inner');
  if (!document.querySelector(`.${ID}__checkboxBtn`)) {
    targetPoint.insertAdjacentHTML('afterend', button(ID));
  }
};

export default () => {
  setup(); //use if needed
  console.log(ID);
  if (VARIATION === 'control') return;

  init(); //
};
