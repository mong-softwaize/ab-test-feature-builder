/*eslint-disable import/no-named-as-default-member */
import activate from './lib/experiment';
import { pollerLite } from '../../../../../globalUtil/util';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  pollerLite(['body', '.pr__product', '.pr__prices'], () => {
    setTimeout(activate, 2000);
  });
}
