import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['body.template-collection', 'main.Main__content > .Container'], activate);
