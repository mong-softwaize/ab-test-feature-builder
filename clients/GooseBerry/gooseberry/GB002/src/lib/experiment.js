import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { pollerLite } from './helpers/utils';
import { categoryData, categoryDataV2 } from './data/categoryData';
import categories from './components/categories';

const { ID, VARIATION } = shared;

const init = () => {
  const insertPoint = document.querySelector('.drawer-menu .drawer-menu__bottom');

  if (!document.querySelector(`.${ID}__categoriesWrapper`)) {
    insertPoint.insertAdjacentHTML('beforebegin', categories(ID, VARIATION === '1' ? categoryData : categoryDataV2));
  }
};

export default () => {
  setup();
  if (VARIATION === 'Control') return;

  init();
};
