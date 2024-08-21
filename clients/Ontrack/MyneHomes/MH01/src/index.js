import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

const DOM_INTERVAL = 2000;

pollerLite(['body', () => window.location.pathname.includes('/listings/')], () => {
  setTimeout(activate, DOM_INTERVAL);
});
