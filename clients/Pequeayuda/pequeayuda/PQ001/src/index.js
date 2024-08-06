import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['body', '.home.page-template', 'div[data-elementor-type="header"]'], () => {
  setTimeout(activate, 1000);
});
