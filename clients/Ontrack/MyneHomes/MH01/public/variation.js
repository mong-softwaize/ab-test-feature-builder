(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var shared = {
	    ID: "MH01",
	    VARIATION: "1",
	    CLIENT: "Ontrack",
	    SITE: "MyneHomes"
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
	const onUrlChange = (callback, onError = null) => {
	  if (typeof callback !== 'function') {
	    throw new Error('Callback function must be provided');
	  }
	  const mutationConfig = {
	    childList: true,
	    subtree: true,
	    attributes: true,
	  };
	  const observer = new MutationObserver((mutationsList) => {
	    mutationsList.forEach((mutation) => {
	      const currentUrl = window.location.href;
	      if (observer.previousUrl !== currentUrl) {
	        const oldHref = observer.previousUrl;
	        observer.previousUrl = currentUrl;
	        observer.disconnect();
	        try {
	          setTimeout(() => {
	            callback(oldHref, mutation);
	          }, 1000);
	        } catch (error) {
	          console.log(`Error in callback function: ${error}`);
	        }
	        observer.observe(document.documentElement, mutationConfig);
	      }
	    });
	  });
	  try {
	    observer.previousUrl = window.location.href;
	    observer.observe(document.documentElement, mutationConfig);
	  } catch (error) {
	    if (onError && typeof onError === 'function') {
	      onError(error);
	    } else {
	      console.log(`Error starting onUrlChange observer: ${error}`);
	    }
	  }
	};

	const element = (id, info) => {
	  console.log('info', info);
	  const formtTitle = window.location.pathname.includes('/de/') ? 'Mehr Informationen erhalten' : 'Get more information';
	  const { imageSrc, locationName, hotelName, pillsBox, price, perShare, collectHighlightInfo, title } = info;
	  const html = `<div class="${id}__elementWrapper">
    <div class="${id}__elementContainer">
      <div class="${id}__element-title">${formtTitle}</div>
      <div class="${id}__elementContainer-mainSection">
        <div class="${id}__elementContainer-imageWrapper">
          <div class="${id}__elementContainer-image">
            <img src="${imageSrc}"/>
            <div class="${id}__pileBox">
              ${pillsBox.outerHTML}
            </div>
          </div>
        </div>
        <div class="${id}__elementContainer-content">
          <p>${locationName}</p>
          <h2>${hotelName}</h2>
          <div class="${id}__priceWarpper">
            <span class="perSharePrice">${price}</span>
            <span class="perShareText">${perShare}</span>
          </div>
          <h5>${title}</h5>
          <div class="${id}__pileBox">
              ${pillsBox.outerHTML}
          </div>
        </div>
      </div>
        ${
          collectHighlightInfo.length
            ? `
            <div class="${id}__elementContainer-footer">
              <div class="${id}__elementContainer-footer-title">Highlights</div>
              <div class="${id}__elementContainer-footer-content">
                ${collectHighlightInfo.map((item) => item.outerHTML).join('\n')}
              </div>
            </div>
          `
            : ''
        }
    </div>
  </div>`;
	  return html.trim();
	};

	const { ID, VARIATION } = shared$1;
	const DOM_INTERVAL$1 = 500;
	const HIGHLIGHT_THRESHOLD = 4;
	const collectInformation = () => {
	  const wrapper = document.querySelector('div[data-ontrack-id="property-title"]');
	  const imageSrc = document.querySelector('[data-ontack-id="property-image-carousel-item"] img').src;
	  const locationName = wrapper?.querySelector('.text-ocean')?.textContent.trim();
	  const hotelName = wrapper?.querySelector('.typo-head-a')?.textContent.trim();
	  const pillsBox = document.querySelector('[data-ontrack-id="property-title-pills-box"]').cloneNode(true);
	  const priceWrapper = document.querySelector('div[data-ontrack-id="property-price-box"]');
	  const price = priceWrapper?.querySelector('span[data-ontrack-id="property-price-value"]')?.textContent.trim();
	  const perShare = priceWrapper.querySelector('.flex-col > div.typo-body')?.textContent.trim().replace(',', '');
	  const highlightsWrapper = document.querySelector('[data-ontrack-id="property-highlights-list"]');
	  const collectHighlightInfo = Array.from(highlightsWrapper.querySelectorAll('.grid'))
	    .map((item, index) => item.cloneNode(true))
	    .splice(0, HIGHLIGHT_THRESHOLD + 1);
	  return {
	    imageSrc,
	    locationName,
	    hotelName,
	    pillsBox,
	    price,
	    perShare,
	    collectHighlightInfo,
	    title: window.location.pathname.includes('/de/')
	      ? 'inkl. Kaufkosten, Upgrades und Ausstattung'
	      : 'incl. purchase costs, upgrades and equipment',
	  };
	};
	const init = () => {
	  if (document.querySelector(`.${ID}__elementWrapper`)) {
	    document.querySelector(`.${ID}__elementWrapper`).remove();
	  }
	  const info = collectInformation();
	  document.body.insertAdjacentHTML('beforeend', element(ID, info));
	};
	var activate = () => {
	  setup();
	  const isListenerAdded = document.body.dataset[`${ID}__isListenerAdded`];
	  if (!isListenerAdded) {
	    document.body.addEventListener('click', (e) => {
	      if (!window.location.pathname.includes('/listings/') && !window.location.pathname.includes('/immobilien/')) return;
	      const { target } = e;
	      const submitValue = window.location.pathname.includes('/de/') ? 'Exposés anfordern' : 'Submit';
	      if (target.closest('button[data-ontrack-id="request-expose-button"]')) {
	        pollerLite(['#headlessui-portal-root .grid-flow-row', `#headlessui-portal-root input[value="${submitValue}"]`], () => {
	          const modalWrapper = document.querySelector('#headlessui-portal-root');
	          modalWrapper.classList.add(`${ID}__modalWrapper`);
	          const gridWrapper = modalWrapper.querySelector('.grid-flow-row');
	          gridWrapper.classList.add(`${ID}__gridWrapper`);
	          const element = document.querySelector(`.${ID}__elementWrapper`);
	          const cloneElement = element.cloneNode(true);
	          const mainContainer = document.querySelector('#headlessui-portal-root .grid-flow-row');
	          mainContainer.insertAdjacentElement('beforeend', cloneElement);
	        });
	      }
	    });
	  }
	  document.body.dataset[`${ID}__isListenerAdded`] = true;
	  if (VARIATION === 'control') return;
	  init();
	  onUrlChange(() => {
	    pollerLite(
	      ['body', () => window.location.pathname.includes('/listings/') || window.location.pathname.includes('/immobilien/')],
	      () => {
	        if (!document.documentElement.classList.contains(ID)) {
	          setup();
	          setTimeout(init, DOM_INTERVAL$1);
	        }
	      }
	    );
	  });
	};

	const DOM_INTERVAL = 500;
	pollerLite(
	  ['body', () => window.location.pathname.includes('/listings/') || window.location.pathname.includes('/immobilien/')],
	  () => {
	    setTimeout(activate, DOM_INTERVAL);
	  }
	);

})();
