import activate from './lib/experiment';
import { pollerLite } from '../../../../../globalUtil/util';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  pollerLite(
    [
      'body',
      '#___gatsby',
      '.css-5j6s9h',
      () => window.ga !== undefined && window.ga.getAll !== undefined
    ],
    activate
  );
}
