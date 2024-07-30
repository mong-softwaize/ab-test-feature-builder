import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['body.template-product', '.model-size-dropdown', '.product__color-chips'], activate);
