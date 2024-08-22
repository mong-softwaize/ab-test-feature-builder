import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

const DOM_INTERVAL = 500;

pollerLite(
  ['body', () => window.location.pathname.includes('/listings/') || window.location.pathname.includes('/immobilien/')],
  () => {
    setTimeout(activate, DOM_INTERVAL);
  }
);
