import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['body', '.drawer-menu .drawer-menu__bottom'], activate);
