import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['body', '.product-template-default', '.elementor-page-title.elementor-widget-heading + div'], activate);
