import activate from './lib/experiment';
import { pollerLite } from './lib/helpers/utils';

pollerLite(['body div[data-test-id="pdp-wrapper"]', '#demoup_stage2_script'], activate);
