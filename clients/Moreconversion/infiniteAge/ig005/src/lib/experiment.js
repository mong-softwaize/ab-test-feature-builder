import setup from './services/setup';

import shared from './shared/shared';
import { messageStr } from './components/messageStr';

const { ID } = shared;

export default () => {
  setup(); //use if needed

  //-----------------------------
  //If control, bail out from here
  //-----------------------------
  //if (VARIATION === 'control') {
  //}

  //-----------------------------
  //Write experiment code here
  //-----------------------------
  //...

  if (document.querySelector(`.${ID}__row`)) {
    document.querySelector(`.${ID}__row`).remove();
  }
  document
    .querySelector('.addcart:not(.addcartbox) > .row')
    .insertAdjacentHTML('beforebegin', messageStr(ID));
};
