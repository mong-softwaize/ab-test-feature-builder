import { pollerLite } from '../helpers/utils';
import shared from '../shared/shared';

const gaTracking = (label) => {
  const { VARIATION } = shared;
  const variationType = VARIATION === '1' ? '1' : 'C';

  const GA4_PROPERTY_ID = 'G-P2725WEG9G';
  const GA4_INTERNAL_EXPERIMENT_NUM = '6426702469';
  const GA4_INTERNAL_EXPERIMENT_ID = `View Eye Label ${GA4_INTERNAL_EXPERIMENT_NUM}`;
  const EXPERIMENT_DEVICE_CATEGORY = 'All Devices';

  pollerLite([() => document.readyState === 'complete'], () => {
    if (window.gtag !== undefined) {
      window.gtag('event', GA4_INTERNAL_EXPERIMENT_ID, {
        event_category: EXPERIMENT_DEVICE_CATEGORY,
        event_label: `${GA4_INTERNAL_EXPERIMENT_NUM} | V${variationType} | ${label}`,
        send_to: GA4_PROPERTY_ID
      });
    } else {
      window.dataLayer.push({
        event: 'cro_event',
        event_detail: GA4_INTERNAL_EXPERIMENT_ID,
        event_category: EXPERIMENT_DEVICE_CATEGORY,
        event_label: `${GA4_INTERNAL_EXPERIMENT_NUM} | V${variationType} | ${label}`,
        send_to: GA4_PROPERTY_ID
      });
    }
  });
};

export default gaTracking;
