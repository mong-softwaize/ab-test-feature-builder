(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var shared = {
	    ID: "PQ001",
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
	const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
	  const target = document.querySelector(`${targetSelectorString}`);
	  if (!target) return;
	  const config = configObject || {
	    childList: true,
	    subtree: false,
	    attributes: true,
	    characterData: false,
	    characterDataOldValue: false,
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
	const initSwiper = (id) => {
	  new window.Swiper(`.${id}__swiper`, {
	    slidesPerView: 1,
	    spaceBetween: 30,
	    loop: true,
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },
	  });
	};

	const cartIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="PQ001__cartIcon">
<path d="M0.795301 1.59358C0.795301 1.38141 0.879587 1.17792 1.02962 1.02789C1.17964 0.877864 1.38313 0.793579 1.5953 0.793579H2.2961C3.4593 0.793579 4.1281 1.55038 4.5153 2.30558C4.7793 2.82238 4.9697 3.45278 5.1281 3.99998H21.6001C21.8473 4.00005 22.0912 4.05742 22.3125 4.16757C22.5338 4.27772 22.7266 4.43766 22.8758 4.63485C23.0249 4.83204 23.1263 5.0611 23.172 5.30406C23.2177 5.54702 23.2065 5.79727 23.1393 6.03518L20.7457 14.4752C20.5553 15.1448 20.1517 15.7341 19.5962 16.1536C19.0407 16.5731 18.3635 16.8001 17.6673 16.8H9.5409C8.83894 16.8002 8.15638 16.5696 7.59837 16.1438C7.04036 15.7179 6.63787 15.1203 6.4529 14.4432L5.4257 10.6752C5.41981 10.6583 5.41448 10.6412 5.4097 10.624L3.7601 5.02878L3.6001 4.48958C3.4401 3.93598 3.2993 3.44638 3.0881 3.03518C2.8337 2.53918 2.6001 2.39518 2.2945 2.39518H1.5937C1.38153 2.39518 1.17804 2.31089 1.02802 2.16086C0.877986 2.01084 0.793701 1.80735 0.793701 1.59518L0.795301 1.59358ZM6.9521 10.192L7.9969 14.0256C8.08953 14.364 8.29084 14.6626 8.56983 14.8754C8.84882 15.0882 9.19003 15.2033 9.5409 15.2032H17.6689C18.0168 15.2028 18.3551 15.0891 18.6326 14.8792C18.91 14.6693 19.1115 14.3747 19.2065 14.04L21.6001 5.59998H5.6001L6.9521 10.192ZM12.0001 20.7984C12.0001 21.4349 11.7472 22.0453 11.2972 22.4954C10.8471 22.9455 10.2366 23.1984 9.6001 23.1984C8.96358 23.1984 8.35313 22.9455 7.90304 22.4954C7.45296 22.0453 7.2001 21.4349 7.2001 20.7984C7.2001 20.1619 7.45296 19.5514 7.90304 19.1013C8.35313 18.6512 8.96358 18.3984 9.6001 18.3984C10.2366 18.3984 10.8471 18.6512 11.2972 19.1013C11.7472 19.5514 12.0001 20.1619 12.0001 20.7984ZM10.4001 20.7984C10.4001 20.5862 10.3158 20.3827 10.1658 20.2327C10.0158 20.0827 9.81227 19.9984 9.6001 19.9984C9.38793 19.9984 9.18444 20.0827 9.03442 20.2327C8.88439 20.3827 8.8001 20.5862 8.8001 20.7984C8.8001 21.0106 8.88439 21.214 9.03442 21.3641C9.18444 21.5141 9.38793 21.5984 9.6001 21.5984C9.81227 21.5984 10.0158 21.5141 10.1658 21.3641C10.3158 21.214 10.4001 21.0106 10.4001 20.7984ZM20.0001 20.7984C20.0001 21.4349 19.7472 22.0453 19.2972 22.4954C18.8471 22.9455 18.2366 23.1984 17.6001 23.1984C16.9636 23.1984 16.3531 22.9455 15.903 22.4954C15.453 22.0453 15.2001 21.4349 15.2001 20.7984C15.2001 20.1619 15.453 19.5514 15.903 19.1013C16.3531 18.6512 16.9636 18.3984 17.6001 18.3984C18.2366 18.3984 18.8471 18.6512 19.2972 19.1013C19.7472 19.5514 20.0001 20.1619 20.0001 20.7984ZM18.4001 20.7984C18.4001 20.5862 18.3158 20.3827 18.1658 20.2327C18.0158 20.0827 17.8123 19.9984 17.6001 19.9984C17.3879 19.9984 17.1844 20.0827 17.0344 20.2327C16.8844 20.3827 16.8001 20.5862 16.8001 20.7984C16.8001 21.0106 16.8844 21.214 17.0344 21.3641C17.1844 21.5141 17.3879 21.5984 17.6001 21.5984C17.8123 21.5984 18.0158 21.5141 18.1658 21.3641C18.3158 21.214 18.4001 21.0106 18.4001 20.7984Z" fill="black"/>
</svg>
`;
	const coverage = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" fill="black"/>
</svg>
`;
	const delivery = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 3C1 2.73478 1.10536 2.48043 1.29289 2.29289C1.48043 2.10536 1.73478 2 2 2H13C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3V8H18C18.6566 8 19.3068 8.12933 19.9134 8.3806C20.52 8.63188 21.0712 9.00017 21.5355 9.46447C21.9998 9.92876 22.3681 10.48 22.6194 11.0866C22.8707 11.6932 23 12.3434 23 13V17C23.0001 17.6437 22.7932 18.2705 22.4098 18.7876C22.0265 19.3048 21.487 19.6849 20.871 19.872C20.6876 20.477 20.3178 21.0086 19.8143 21.3909C19.3108 21.7732 18.6994 21.9867 18.0674 22.0009C17.4353 22.0151 16.815 21.8293 16.2948 21.4699C15.7747 21.1106 15.3814 20.5962 15.171 20H8.83C8.61962 20.5962 8.22629 21.1106 7.70616 21.4699C7.18602 21.8293 6.56566 22.0151 5.93363 22.0009C5.3016 21.9867 4.69021 21.7732 4.18673 21.3909C3.68324 21.0086 3.3134 20.477 3.13 19.872C2.51384 19.6851 1.97412 19.305 1.59057 18.7879C1.20701 18.2707 0.999962 17.6439 1 17V13H7C7.26522 13 7.51957 12.8946 7.70711 12.7071C7.89464 12.5196 8 12.2652 8 12C8 11.7348 7.89464 11.4804 7.70711 11.2929C7.51957 11.1054 7.26522 11 7 11H1V9H5C5.26522 9 5.51957 8.89464 5.70711 8.70711C5.89464 8.51957 6 8.26522 6 8C6 7.73478 5.89464 7.48043 5.70711 7.29289C5.51957 7.10536 5.26522 7 5 7H1V3ZM14 18H15.171C15.3687 17.4404 15.7279 16.9521 16.2032 16.5967C16.6785 16.2414 17.2485 16.0349 17.8411 16.0036C18.4337 15.9722 19.0223 16.1173 19.5325 16.4205C20.0426 16.7237 20.4513 17.1714 20.707 17.707C20.8 17.6143 20.8738 17.5041 20.924 17.3827C20.9743 17.2614 21.0001 17.1313 21 17V13C21 12.2044 20.6839 11.4413 20.1213 10.8787C19.5587 10.3161 18.7956 10 18 10H14V18ZM7 19C7 18.7348 6.89464 18.4804 6.70711 18.2929C6.51957 18.1054 6.26522 18 6 18C5.73478 18 5.48043 18.1054 5.29289 18.2929C5.10536 18.4804 5 18.7348 5 19C5 19.2652 5.10536 19.5196 5.29289 19.7071C5.48043 19.8946 5.73478 20 6 20C6.26522 20 6.51957 19.8946 6.70711 19.7071C6.89464 19.5196 7 19.2652 7 19ZM17.293 18.293C17.1999 18.3856 17.126 18.4958 17.0757 18.6172C17.0254 18.7385 16.9997 18.8686 17 19C17 19.2314 17.0801 19.4556 17.2269 19.6344C17.3736 19.8133 17.5778 19.9358 17.8047 19.981C18.0316 20.0261 18.2672 19.9912 18.4712 19.8822C18.6753 19.7732 18.8352 19.5968 18.9238 19.3831C19.0124 19.1693 19.0241 18.9315 18.957 18.7101C18.8899 18.4887 18.7481 18.2974 18.5557 18.1688C18.3634 18.0403 18.1324 17.9824 17.9021 18.005C17.6719 18.0277 17.4566 18.1294 17.293 18.293Z" fill="black"/>
</svg>
`;
	const returnIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
<path d="M2.2088 1.97872C2.3213 1.74997 2.5688 1.61872 2.82005 1.65247L12.0001 2.79997L21.1801 1.65247C21.4313 1.62247 21.6788 1.75372 21.7913 1.97872L23.3551 5.10622C23.6926 5.77747 23.3326 6.59122 22.6126 6.79747L16.4851 8.54872C15.9638 8.69872 15.4051 8.47747 15.1276 8.01247L12.0001 2.79997L8.87255 8.01247C8.59505 8.47747 8.0363 8.69872 7.51505 8.54872L1.3913 6.79747C0.667551 6.59122 0.311301 5.77747 0.648801 5.10622L2.2088 1.97872ZM12.0413 5.19997L14.1001 8.62747C14.6588 9.55747 15.7726 9.99997 16.8188 9.69997L21.6001 8.33497V14.5975C21.6001 15.4225 21.0376 16.1425 20.2351 16.345L12.5813 18.2575C12.1988 18.355 11.7976 18.355 11.4188 18.2575L3.76505 16.345C2.96255 16.1387 2.40005 15.4187 2.40005 14.5937V8.33122L7.18505 9.69997C8.22755 9.99997 9.34505 9.55747 9.9038 8.62747L11.9588 5.19997H12.0413Z" fill="black"/>
</svg>
`;

	const categories = (id, data) => {
	  const html = `
      <div class="${id}__categoriesWrapper">
      
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

	const categoryData = [
	  {
	    name: 'Extractores',
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/4.jpg',
	    link: '/extractores-electricos/',
	  },
	  {
	    name: 'Fórmulas',
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/2.jpg',
	    link: '/categoria-producto/formulas/',
	  },
	  {
	    name: 'Pañales',
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/1-1.jpg',
	    link: '/categoria-producto/panales/',
	  },
	  {
	    name: 'Pañitos Húmedos',
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/3.jpg',
	    link: '/categoria-producto/toallas-humedas/',
	  },
	  {
	    name: 'Regalos para bebés',
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/5.jpg',
	    link: '/etiqueta-producto/exclusivo/',
	  },
	  {
	    name: 'Biberóns',
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/6.jpg',
	    link: '/categoria-producto/biberon/',
	  },
	  {
	    name: 'Artículos para bebés',
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/7.jpg',
	    link: '/categoria-producto/basicos-para-bebes/',
	  },
	];
	const bannerData = [
	  {
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/Correct-Position-for-Formula-Feeding-Babies.jpg',
	    header: 'Dale a tu bebé el mejor comienzo',
	    subHeader: 'Combinaciones perfectas para las necesidades únicas de tu bebé',
	    btnText: 'Explora tus opciones',
	    btnLink: '/categoria-producto/suplemento/',
	  },
	  {
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/Depositphotos_38182141_s.jpg',
	    header: 'Nutre el crecimiento de tu bebé',
	    subHeader: 'La salud de tu bebé comienza con las mejores fórmulas',
	    btnText: 'Mira las opciones',
	    btnLink: '/categoria-producto/formulas/',
	  },
	  {
	    imageUrl: 'https://pequeayuda.com/wp-content/uploads/2024/08/close-up-parent-playing-with-his-baby-scaled.jpg',
	    header: 'Pañales cómodos para tu bebé',
	    subHeader: 'Combinaciones perfectas para las necesidades únicas de tu bebé',
	    btnText: 'Elige tu preferido',
	    btnLink: '/categoria-producto/panales/',
	  },
	];
	const uspsWrapperData = [
	  {
	    icon: coverage,
	    text: '<span>Cobertura en<br/><span class="PQ001__text">300+ ciudades</span></span>',
	  },
	  {
	    icon: delivery,
	    text: '<span>Entrega aprox<br/><span class="PQ001__text">24 a 48 horas</span></span>',
	  },
	  {
	    icon: returnIcon,
	    text: '<span>Devolución<br/><span class="PQ001__text">sin costo</span></span>',
	  },
	];

	const bannerItem = (id, data) => {
	  const { imageUrl, header, subHeader, btnText, btnLink } = data;
	  const html = `
    <div class="swiper-slide ${id}__bannerItem">
      <div class="${id}__bannerItem-slide" style="background-image:url(${imageUrl})">
        <div class="${id}__bannerItem-content">
            <h1>${header}</h1>
            <h2>${subHeader}</h1>
            <a href="${btnLink}" class="${id}__bannerItem-btn">${btnText}</a>
        </div>
      </div>
    </div>
  `;
	  return html.trim();
	};

	const bannerWrapper = (id, data) => {
	  const html = `
        <div class="${id}__bannerWrapper">
            <div class="swiper ${id}__swiper">
                <div class="swiper-wrapper">
                    ${data.map((item) => bannerItem(id, item)).join('\n')}
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            
        </div>
    `;
	  return html.trim();
	};

	const uspsWrapper = (id, data) => {
	  const html = `
    <div class="${id}__uspsContainer">
        <div class="${id}__uspsBox">
            ${data
              .map((item) => {
                return `
                    <div class="${id}__uspsItem">
                        <div class="${id}__uspsIcon">${item.icon}</div>
                        <div class="${id}__uspsText">${item.text}</div>
                    </div>
                `;
              })
              .join('\n')}
        </div>
    </div>
  `;
	  return html.trim();
	};

	const { ID, VARIATION } = shared$1;
	const init = () => {
	  const headerOnly = document.querySelector('div[data-elementor-type="header"]');
	  const header = document.querySelector('div[data-elementor-type="header"] > div[data-element_type="container"]:last-child');
	  header.classList.add(`${ID}__header`);
	  header.closest('div[data-elementor-type="header"]');
	  if (!header.querySelector(`.${ID}__cartIcon`)) {
	    pollerLite(['.elementor-hidden-desktop .elementor-button-icon > .elementor-button-icon-qty'], () => {
	      header.querySelector('.elementor-button-icon > .elementor-button-icon-qty').insertAdjacentHTML('afterend', cartIcon);
	    });
	  }
	  if (!document.querySelector(`.${ID}__categoriesWrapper`)) {
	    headerOnly.insertAdjacentHTML('afterend', categories(ID, categoryData));
	  }
	  if (!document.querySelector(`.${ID}__bannerWrapper`)) {
	    pollerLite([() => typeof window.Swiper === 'function'], () => {
	      document.querySelector(`.${ID}__categoriesWrapper`).insertAdjacentHTML('afterend', bannerWrapper(ID, bannerData));
	      initSwiper(ID);
	      if (!document.querySelector(`.${ID}__uspsContainer`)) {
	        document.querySelector(`.${ID}__bannerWrapper`).insertAdjacentHTML('afterend', uspsWrapper(ID, uspsWrapperData));
	      }
	    });
	  }
	  observeDOM('div[data-elementor-type="header"] .elementor-menu-cart__toggle_wrapper', (mutation) => {
	    if (!header.querySelector(`.${ID}__cartIcon`)) {
	      pollerLite(['.elementor-hidden-desktop .elementor-button-icon > .elementor-button-icon-qty'], () => {
	        header.querySelector('.elementor-button-icon > .elementor-button-icon-qty').insertAdjacentHTML('afterend', cartIcon);
	      });
	    }
	  });
	};
	var activate = () => {
	  setup();
	  if (VARIATION === 'Control') return;
	  init();
	};

	pollerLite(['body', '.home.page-template', 'div[data-elementor-type="header"]'], () => {
	  setTimeout(activate, 1000);
	});

})();
