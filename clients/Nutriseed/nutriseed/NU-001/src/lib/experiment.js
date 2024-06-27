import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { pollerLite } from './helpers/utils';
import { hero } from './components/hero';

const { ID, VARIATION } = shared;

const init = () => {
  const exitingHeroSection = document.querySelector('.section.hero.desktop_layout');
  if (!document.querySelector(`.${ID}__hero-section`)) {
    exitingHeroSection.insertAdjacentHTML('afterend', hero(ID));
  }
};
export default () => {
  setup(); //use if needed
  console.log(ID);

  if (VARIATION === 'control') return; //

  init(); //
};
