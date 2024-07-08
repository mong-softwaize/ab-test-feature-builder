(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var shared = {
	    ID: "HC-001",
	    VARIATION: "1",
	    CLIENT: "HotelCollection",
	    SITE: "hotelCollection"
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
	    title: 'scent diffusers',
	    image: 'https://www.hotelcollection.com/cdn/shop/files/wirelesspro-myway.png?v=1708708169&width=640',
	    url: '/collections/scent-diffusers',
	    alt: 'scent diffusers',
	  },
	  {
	    title: 'Scent diffuser&nbsp;oils',
	    image: 'https://www.hotelcollection.com/cdn/shop/files/fragranceoils.jpg?v=1690361338&width=500',
	    url: '/collections/fragrance-oil',
	    alt: 'Scent diffuser oils',
	  },
	  {
	    title: 'chauffeur car&nbsp;diffuser',
	    image: 'https://www.hotelcollection.com/cdn/shop/files/Car-Diffuser.png?v=1690529341&width=600',
	    url: '/collections/car-diffuser-oil',
	    alt: 'chauffeur cardiffuser',
	  },
	  {
	    title: 'room <br>sprays',
	    image: 'https://storage.googleapis.com/abtest-img-bucket/hc-64/4.png',
	    url: '/collections/room-sprays',
	    alt: 'room sprays',
	  },
	  {
	    title: 'reed diffusers',
	    image:
	      'https://www.hotelcollection.com/cdn/shop/files/Reed-Diffusers_03a43b7f-c255-48a1-8fc3-02238e70e0e1.png?v=1690529359&width=600',
	    url: '/collections/reed-diffusers',
	    alt: 'reed diffusers',
	  },
	  {
	    title: 'candle <br>sets',
	    image:
	      'https://www.hotelcollection.com/cdn/shop/files/Candles_a9eba6ef-1e3e-4797-bc35-493789e0fbfe.png?v=1690529452&width=588',
	    url: '/collections/all-candles',
	    alt: 'candle sets',
	  },
	  {
	    title: 'hourglass diffuser',
	    image: 'https://storage.googleapis.com/abtest-img-bucket/hc-64/7.png',
	    url: '/collections/hourglass-diffuser-and-oils',
	    alt: 'hourglass diffuser',
	  },
	];

	const categoryCard = (id, category) => {
	    const htmlStr = `
        <a href='${category?.url}' class='${id}__categoryCard'>
            <img src='${category?.image}' alt='${category?.title}' class='${id}__image' />
            <p class='${id}__title'>${category?.title}</p>
        </a>
        `;
	    return htmlStr;
	};

	const categoryCards = (id, data) => {
	  const htmlStr = `
            <div class="${id}__container">
                <div class="${id}__title">SHOP BY CATEGORY</div>
                <div class="scrollable-wrapper">
                    <div class='${id}__categoryCards'>
                        ${data?.map((category) => categoryCard(id, category)).join('')}
                    </div>
                </div>
            </div>
    
    `;
	  return htmlStr;
	};

	const { ID, VARIATION } = shared$1;
	const init = () => {
	  const targetPoint = document.querySelector('.homepage-family-section');
	  if (!document.querySelector(`.${ID}__container`)) {
	    targetPoint.insertAdjacentHTML('beforebegin', categoryCards(ID, categoryData));
	  }
	};
	var activate = () => {
	  setup();
	  console.log(ID);
	  if (VARIATION === 'Control') return;
	  init();
	};

	pollerLite(['body', '.homepage-family-section'], activate);

})();
