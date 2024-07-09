(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var shared = {
	    ID: "WB-002",
	    VARIATION: "1",
	    CLIENT: "WildBird",
	    SITE: "wildbird"
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
	const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
	  const target = document.querySelector(`${targetSelectorString}`);
	  if (!target) return;
	  const config = configObject || {
	    subtree: false,
	    childList: true,
	    attributes: true,
	    characterData: true,
	  };
	  const observer = new MutationObserver((mutations) => {
	    mutations.forEach((mutation) => {
	      observer.disconnect();
	      callbackFunction(mutation);
	      observer.observe(target, config);
	    });
	  });
	  observer.observe(target, config);
	};
	const formatNumber = (num) => {
	  if (num >= 1000 || num <= -1000) {
	    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	  } else {
	    return num.toFixed(2);
	  }
	};
	const calculateSellPrice = (mainPrice, percentage) => {
	  let discount = (mainPrice * percentage) / 100;
	  let price = mainPrice - discount;
	  return price;
	};

	const button = (id, percentage = '', oldPrice = 0, sellPrice = 0) => {
	  const isDisabled = oldPrice === 0 ? 'disabled=true' : '';
	  const isStrikeThrough = sellPrice !== 0 ? 'strikeThrough' : '';
	  const html = `
        <div class="${id}__checkboxBtn">
            <div class="${id}__calculation">
                <span class="${id}__text">Subtotal: </span>
                <span class="${id}__price ${isStrikeThrough}">$${formatNumber(oldPrice)}</span>
                 ${sellPrice != 0 ? `<span class="${id}__sellPrice">$${formatNumber(sellPrice)}</span>` : ''}
                ${percentage != '' ? `<span class="${id}__percenteage">${percentage}</span>` : ''}
            </div>
            <button type="button" ${isDisabled} class="${id}__Button">Checkout</button></div>
        </div>
    `;
	  return html;
	};
	const buttonV2 = (id, oldPrice = 0, sellPrice = 0) => {
	  const isDisabled = oldPrice === 0 ? 'disabled=true' : '';
	  const isStrikeThrough = sellPrice !== 0 ? 'strikeThrough' : '';
	  const html = `
        <div class="${id}__checkboxBtn">
            <button type="button" ${isDisabled} class="${id}__Button">
                  <span>Checkout: </span>
                  <span class="${id}__price ${isStrikeThrough}">$${formatNumber(oldPrice)}</span>
                   ${sellPrice != 0 ? `<span class="${id}__sellPrice">$${formatNumber(sellPrice)}</span>` : ''}
            </button>
        </div>
    `;
	  return html;
	};

	const freeShipping = (id) => {
	  const html = `
    <span class="${id}__freeShipping">Free Shipping</span>
  `;
	  return html;
	};

	const { ID, VARIATION } = shared$1;
	const updateDom = (percentage, oldPrice, sellPrice) => {
	  document.querySelector(`.${ID}__checkboxBtn`).remove();
	  const targetPoint = document.querySelector('.Section--bundle-checkout .Container > .inner');
	  if (!document.querySelector(`.${ID}__checkboxBtn`)) {
	    targetPoint.insertAdjacentHTML(
	      'afterend',
	      VARIATION === '1' ? button(ID, percentage, oldPrice, sellPrice) : buttonV2(ID, oldPrice, sellPrice)
	    );
	  }
	};
	const calculationFn = (indicator = 0) => {
	  const checkoutBtn = document.querySelector('.Section.Section--bundle-checkout button[type="submit"]');
	  const oldPrice = parseFloat(checkoutBtn.innerText.toLowerCase().split('checkout: $')[1].replace(/,/g, ''));
	  let percentage;
	  let sellPrice;
	  if (indicator === 1) {
	    percentage = '';
	  } else if (indicator === 2) {
	    percentage = '10% OFF';
	    sellPrice = calculateSellPrice(oldPrice, 10);
	  } else if (indicator === 3) {
	    percentage = '15% OFF';
	    sellPrice = calculateSellPrice(oldPrice, 15);
	  } else {
	    percentage = '';
	  }
	  updateDom(percentage, oldPrice, sellPrice);
	};
	const init = () => {
	  console.log('WB#15 is running');
	  const targetPoint = document.querySelector('.Section--bundle-checkout .Container > .inner');
	  if (!document.querySelector(`.${ID}__checkboxBtn`)) {
	    targetPoint.insertAdjacentHTML('afterend', VARIATION === '1' ? button(ID) : buttonV2(ID));
	  }
	  const bundleList = document.querySelector('.Section.Section--bundle-checkout .BundleProgressBar__list');
	  bundleList?.querySelectorAll('.BundleProgressBar__list__marker').forEach((item, index) => {
	    if (!item.querySelector(`.${ID}__freeShipping`) && index > 0) {
	      item.querySelector('span').insertAdjacentHTML('beforebegin', freeShipping(ID));
	    }
	  });
	  const callBackHandler = (mutation) => {
	    let timer;
	    clearTimeout(timer);
	    timer = setTimeout(() => {
	      const parentElement = targetPoint.querySelector('.BundleProgressBar');
	      const childList = Array.from(parentElement.childNodes);
	      const unlockedList = Array.from(parentElement.querySelectorAll('.unlocked'));
	      const index =
	        unlockedList.length >= 1 &&
	        childList.findIndex((item) => {
	          const lastUnlockedElement = unlockedList[unlockedList.length - 1];
	          return item == lastUnlockedElement.closest('.BundleProgressBar__tier');
	        });
	      calculationFn(index);
	    }, 500);
	  };
	  observeDOM('.Section.Section--bundle-summary .Loop', callBackHandler);
	};
	var activate = () => {
	  setup();
	  if (VARIATION === 'control') return;
	  document.body.addEventListener('click', (e) => {
	    const { target } = e;
	    if (target.closest(`.${ID}__Button`)) {
	      document.querySelector('.Section.Section--bundle-checkout button[type="submit"]').click();
	    }
	  });
	  init();
	};

	pollerLite(['body', '.Section--bundle-checkout'], activate);

})();
