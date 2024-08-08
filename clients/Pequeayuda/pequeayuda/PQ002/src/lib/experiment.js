import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { pollerLite } from './helpers/utils';
import uspsPdp from './components/uspsPdp';

const { ID, VARIATION } = shared;

const init = () => {
  const target = document.querySelector('.elementor-page-title.elementor-widget-heading + div');
  if (!document.querySelector(`.${ID}__uspsPdp`)) {
    target.insertAdjacentHTML('afterend', uspsPdp(ID));
  }
};

export default () => {
  setup(); //use if needed

  //gaTracking('Conditions Met'); //use if needed

  //-----------------------------
  //If control, bail out from here
  //-----------------------------
  //if (VARIATION === 'control') {
  //}

  //-----------------------------
  //Write experiment code here
  //-----------------------------
  //...

  init(); //
};
