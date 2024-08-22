(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var shared = {
	    ID: "GB001",
	    VARIATION: "1",
	    CLIENT: "GooseBerry",
	    SITE: "gooseberry"
	  };
	var shared$1 = getDefaultExportFromCjs(shared);

	const setup = () => {
	  const { ID, VARIATION } = shared$1;
	  document.documentElement.classList.add(ID);
	  document.documentElement.classList.add(`${ID}-${VARIATION}`);
	};

	const pollerLite = (conditions, callback, maxTime = 10000) => {
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

	const { ID, VARIATION } = shared$1;
	const init = () => {
	  if (VARIATION === '1') {
	    const customDropdown = `<div class="${ID}__dropdownWrapper"><div class="${ID}__dropdownContainer"></div></div>`;
	    const targetPoint = document.querySelector('.js-enabled.product__option');
	    const controlModal = document.querySelector('.model-size-dropdown');
	    if (!document.querySelector(`.${ID}__dropdownWrapper`)) {
	      targetPoint.insertAdjacentHTML('afterend', customDropdown);
	    }
	    document.querySelector(`.${ID}__dropdownContainer`).append(controlModal);
	  }
	};
	var activate = () => {
	  setup();
	  console.log(ID);
	  if (VARIATION === 'Control') return;
	  init();
	};

	pollerLite(['body.template-product', '.model-size-dropdown', '.product__color-chips'], activate);

})();
