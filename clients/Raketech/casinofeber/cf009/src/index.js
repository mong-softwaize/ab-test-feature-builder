import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['.toplist-holder .load-more'], activate);
