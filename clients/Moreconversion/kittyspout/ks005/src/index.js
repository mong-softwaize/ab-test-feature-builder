import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['.variant-wrapper.js', '.variant-input[data-value="3.2L"]'], activate);
