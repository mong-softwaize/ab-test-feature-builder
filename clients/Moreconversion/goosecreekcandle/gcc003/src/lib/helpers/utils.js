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
      console.error('Polling exceeded maximum time limit');
    }
  }, POLLING_INTERVAL);
};
export const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
  const target = document.querySelector(`${targetSelectorString}`);

  if (!target) return;
  //configuration of the observer:

  const config = configObject || {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
    characterDataOldValue: true
  };
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      //console.log(mutation);
      observer.disconnect();

      callbackFunction(mutation);
      observer.observe(target, config);
    });
  });

  observer.observe(target, config);
};
export const addCssToPage = (href, id, classes) => {
  if (document.querySelector(`#${id}`)) {
    return;
  }

  const c = document.createElement('link');
  c.setAttribute('id', id);
  c.setAttribute('rel', 'stylesheet');

  if (classes) {
    c.className = classes;
  }

  c.href = href;
  document.head.appendChild(c);
};
export const addJsToPage = (src, id, cb, classes) => {
  if (document.querySelector(`#${id}`)) {
    return;
  }

  const s = document.createElement('script');
  if (typeof cb === 'function') {
    s.onload = cb;
  }

  if (classes) {
    s.className = classes;
  }

  s.src = src;
  s.setAttribute('id', id);
  document.head.appendChild(s);
};
export const addToCart = (id, quantity) => {
  const payload = {
    id,
    quantity
  };

  const response = fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then((result) => {
    const res = result.json();

    return res;
  });
  return response;
};
