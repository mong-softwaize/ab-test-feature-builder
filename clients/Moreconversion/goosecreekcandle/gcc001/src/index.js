import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['status-save-button'], activate);
