import { fireEvent } from '../../../../../../globalUtil/trackings/services';
import setup from './services/setup';
import shared from './shared/shared';

const { ID } = shared;

export default () => {
  setup(); //use if needed
  //gaTracking('Conditions Met'); //use if needed
  fireEvent('Conditions Met', shared);
  console.log(ID);
  //-----------------------------
  //If control, bail out from here
  //-----------------------------
  //if (VARIATION === 'control') {
  //}

  //-----------------------------
  //Write experiment code here
  //-----------------------------
  //...
  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;
    if (target.closest('#demoup_stage2_script')) {
      fireEvent('User interacts with watch video cta', shared);
    } else if (target.closest('.demoupUI-close') && target.closest('.demoupUI-popup')) {
      fireEvent('User interacts with close cta', shared);
    } else if (
      target.closest('button[data-test-id="view-less-button"]') &&
      target.closest('div[data-test-id="product-overview"]')
    ) {
      fireEvent('User interacts with view less on the overview', shared);
    } else if (
      target.closest('button[data-test-id="view-more-button"]') &&
      target.closest('div[data-test-id="product-overview"]')
    ) {
      fireEvent('User interacts with view more on the overview', shared);
    } else if (target.closest('.demoupUI-item') && target.closest('.demoupUI-popup')) {
      fireEvent('User interacts with other video content', shared);
    }
  });
};
