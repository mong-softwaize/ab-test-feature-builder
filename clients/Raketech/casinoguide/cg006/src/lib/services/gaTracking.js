//import { pollerLite } from '../helpers/utils';
//import shared from '../shared/shared';

//const gaTracking = (label) => {
////console.log(`012 | Variation: ${shared.VARIATION} | ${label}`);

//window.gtag('event', 'Experiment CG Casino Preview 024', {
//event_category: 'Desktop Only Test',
//event_label: `024 | Variant: ${shared.VARIATION} | ${label}`
//});
//};

import { pollerLite } from '../helpers/utils';
import shared from '../shared/shared';

const gaTracking = (label) => {
  const { VARIATION } = shared;

  const GA4_PROPERTY_ID = 'G-P2725WEG9G';
  const GA4_INTERNAL_EXPERIMENT_NUM = '024';
  const GA4_INTERNAL_EXPERIMENT_ID = `Experiment CG Casino Preview ${GA4_INTERNAL_EXPERIMENT_NUM}`;
  const EXPERIMENT_DEVICE_CATEGORY = 'All Device Test';

  pollerLite([() => document.readyState === 'complete'], () => {
    //console.log(label);
    if (window.gtag !== undefined) {
      window.gtag('event', GA4_INTERNAL_EXPERIMENT_ID, {
        event_category: EXPERIMENT_DEVICE_CATEGORY,
        event_label: `${GA4_INTERNAL_EXPERIMENT_NUM} | Variation: ${VARIATION} | ${label}`,
        send_to: GA4_PROPERTY_ID
      });
    } else {
      window.dataLayer.push({
        event: 'cro_event',
        event_detail: GA4_INTERNAL_EXPERIMENT_ID,
        event_category: EXPERIMENT_DEVICE_CATEGORY,
        event_label: `${GA4_INTERNAL_EXPERIMENT_NUM} | Variation: ${VARIATION} | ${label}`,
        send_to: GA4_PROPERTY_ID
      });
    }
  });
};

export default gaTracking;
