import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { pollerLite } from './helpers/utils';
import { categoryData } from './data/data';
import categoryCards from './components/categoryCards';

const { ID, VARIATION } = shared;

const init = () => {
  const targetPoint = document.querySelector('.homepage-family-section');

  if (!document.querySelector(`.${ID}__container`)) {
    targetPoint.insertAdjacentHTML('beforebegin', categoryCards(ID, categoryData));
  }
};

export default () => {
  setup(); //use if needed
  console.log(ID);
  if (VARIATION === 'Control') return;

  init(); //use if needed
};
