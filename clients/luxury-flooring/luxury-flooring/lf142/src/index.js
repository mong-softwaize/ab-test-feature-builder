import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['.homepage-banner', '.page-products'], activate);
