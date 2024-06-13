import shared from '../shared/shared';

const gaTracking = (label) => {
  const { ID, VARIATION } = shared;
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
  const labelMessage = `Variation: ${VARIATION} Label: ${label}`;
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'Experimentation',
    eventAction: 'select',
    eventLabel: labelMessage
  });
};

export default gaTracking;
