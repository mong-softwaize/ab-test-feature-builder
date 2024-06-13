/**
 * Polls the DOM for a condition to be met before executing a callback.
 *
 * @param {array} conditions The array of conditions to check for.
 * @param {function} callback The callback function when all conditions are true.
 * @param {number} maxTime max time the check witll run before abort.
 */
export const pollerLite = (conditions, callback, maxTime = 10000) => {
  const POLLING_INTERVAL = 25;
  const startTime = Date.now();
  const interval = setInterval(() => {
    const allConditionsMet = conditions.every((condition) => {
      if (typeof condition === 'function') {
        return condition();
      }
      return !!document.querySelector(condition);
    });
    if (allConditionsMet) {
      clearInterval(interval);
      callback();
    } else if (Date.now() - startTime >= maxTime) {
      clearInterval(interval);
      console.error('Polling exceeded maximum time limit', conditions);
    }
  }, POLLING_INTERVAL);
};

//Helper function to set data in Local Storage with an expiration time
export const setCroStorage = (key, data, expirationDays = 30) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  const dataToStore = {
    data,
    expires: expirationDate.toISOString()
  };

  localStorage.setItem(key, JSON.stringify(dataToStore));
};

//Helper function to get data from Local Storage and check expiration
export const getCroStorage = (key) => {
  const storedData = localStorage.getItem(key);

  if (storedData) {
    const { data, expires } = JSON.parse(storedData);

    const expirationTime = new Date(expires);
    const currentTime = new Date();

    if (currentTime <= expirationTime) {
      return data;
    }
    //Data has expired, remove it from Local Storage
    localStorage.removeItem(key);
    console.log('Stored data has expired and has been removed.');
  }

  return null; //No valid data found
};

export const removeAllDataAttributes = (element) => {
  //Convert the element's attributes to an array and filter for data attributes
  [...element.attributes].forEach((attr) => {
    if (attr.name.startsWith('data-')) {
      element.removeAttribute(attr.name);
    }
  });
};
