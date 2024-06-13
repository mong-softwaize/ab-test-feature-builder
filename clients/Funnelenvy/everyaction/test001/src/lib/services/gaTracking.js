import shared from '../shared/shared';

const gaTracking = (label, action = 'click') => {
  const { ID, VARIATION } = shared;
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
  //const labelMessage = `Test ID: ${ID} Variation: ${VARIATION} Label: ${label}`;
  //window.ga('create', 'UA-55205898-4', 'auto');
  window.ga.getAll().forEach((tracker) => {
    if (tracker.get('trackingId') === 'UA-55205898-4') {
      tracker.send('event', {
        eventCategory: 'funnelenvy',
        eventAction: action,
        eventLabel: label
      });
    }
  });
  //window.ga('send', 'event', 'funnelenvy', action, label);
};

export default gaTracking;
