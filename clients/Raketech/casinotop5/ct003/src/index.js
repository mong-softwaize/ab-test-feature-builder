import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(
  ['body', () => window.location.pathname.includes('signup-bonus/'), '#td-outer-wrap'],
  activate
);
