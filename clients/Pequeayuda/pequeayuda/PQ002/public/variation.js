(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var shared = {
	    ID: "PQ002",
	    VARIATION: "1",
	    CLIENT: "Pequeayuda",
	    SITE: "pequeayuda"
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

	const uspsPdp = (id) => {
	  const html = `
        <div class="elementor-element e-flex e-con-boxed e-con e-child ${id}__uspsPdp"
            data-element_type="container">
            <div class="e-con-inner">
                <div class="elementor-element elementor-widget elementor-widget-image"
                    data-element_type="widget"
                    data-widget_type="image.default">
                    <div class="elementor-widget-container">
                        <img width="300"
                            height="96"
                            src="https://pequeayuda.com/wp-content/uploads/2023/12/Frame-640-1.png"
                            class="attachment-full size-full ${id}__uspsPdpImage"
                            alt="">
                    </div>
                </div>
            </div>
        </div>
    `;
	  return html.trim();
	};

	const { ID, VARIATION } = shared$1;
	const init = () => {
	  const target = document.querySelector('.elementor-page-title.elementor-widget-heading + div');
	  if (!document.querySelector(`.${ID}__uspsPdp`)) {
	    target.insertAdjacentHTML('afterend', uspsPdp(ID));
	  }
	};
	var activate = () => {
	  setup();
	  init();
	};

	pollerLite(['body', '.product-template-default', '.elementor-page-title.elementor-widget-heading + div'], activate);

})();
