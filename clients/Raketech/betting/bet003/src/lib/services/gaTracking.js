import { pollerLite } from '../helpers/utils';
import shared from '../shared/shared';

const gaTracking = (label) => {
  pollerLite([() => typeof window.gtag === 'function'], () => {
    window.gtag('event', 'Experiment BS Toplist Redesign 023', {
      event_label: `023 | Variant ${shared.VARIATION} | ${label}`,
      event_category: 'Desktop Only Test'
    });
  });
};

export default gaTracking;
