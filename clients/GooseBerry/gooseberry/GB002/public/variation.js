(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var shared = {
	    ID: "GB002",
	    VARIATION: "1",
	    CLIENT: "Gooseberry",
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

	const categoryData = [
	  {
	    name: 'Bras',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v1/bras.png',
	    link: '/collections/shop-bras',
	  },
	  {
	    name: 'Panties',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v1/panties.png',
	    link: '/collections/shop-briefs-intimates',
	  },
	  {
	    name: 'swimwear',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v1/swimwear.png',
	    link: '/collections/shop-all-swimwear',
	  },
	  {
	    name: 'lingerie',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v1/lingerie.png',
	    link: '/collections/shop-all-intimates',
	  },
	  {
	    name: 'clothing',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v1/clothing.png',
	    link: '/collections/clothing',
	  },
	  {
	    name: 'lounge',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v1/lounge.png',
	    link: '/collections/shop-loungewear',
	  },
	];
	const categoryDataV2 = [
	  {
	    name: 'Bras',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v2/bras.png',
	    link: '/collections/shop-bras',
	  },
	  {
	    name: 'Panties',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v2/panties.png',
	    link: '/collections/shop-briefs-intimates',
	  },
	  {
	    name: 'swimwear',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v2/swimwear.png',
	    link: '/collections/shop-all-swimwear',
	  },
	  {
	    name: 'lingerie',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v2/lingerie.png',
	    link: '/collections/shop-all-intimates',
	  },
	  {
	    name: 'clothing',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v2/clothing.png',
	    link: '/collections/clothing',
	  },
	  {
	    name: 'lounge',
	    imageUrl: 'https://storage.googleapis.com/abtest-img-bucket/gby-8/v2/lounge.png',
	    link: '/collections/shop-loungewear',
	  },
	];

	const categories = (id, data) => {
	  const html = `
    <div class="${id}__categoriesWrapper">
        <h1>SHOP BY CATEGORY</h1>
        <div class="${id}__categoriesContainer">
            ${data
              .map((item) => {
                return `
                    <a class="${id}__categoryItem" href="${item.link}">
                        <div class="${id}__imageWrapper">
                            <img src="${item.imageUrl}" alt="${item.name}" loading="lazy">
                        </div>
                        <h2>${item.name}</h2>
                    </a>
                `;
              })
              .join('\n')}
        </div>
    </div>
  `;
	  return html;
	};

	const { ID, VARIATION } = shared$1;
	const init = () => {
	  const insertPoint = document.querySelector('.drawer-menu .drawer-menu__bottom');
	  if (!document.querySelector(`.${ID}__categoriesWrapper`)) {
	    insertPoint.insertAdjacentHTML('beforebegin', categories(ID, VARIATION === '1' ? categoryData : categoryDataV2));
	  }
	};
	var activate = () => {
	  setup();
	  if (VARIATION === 'Control') return;
	  init();
	};

	pollerLite(['body', '.drawer-menu .drawer-menu__bottom'], activate);

})();
