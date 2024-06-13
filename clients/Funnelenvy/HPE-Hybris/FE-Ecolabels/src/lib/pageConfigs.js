export const urlConfigs = {
  '/c/': {
    targetSelector: '.hpe-product-list__row',
    skuSelectors: [
      {
        selector: '.hpe-featured-product__feature li:first-child',
        seperator: ' '
      },
      {
        selector: '.hpe-product-sku',
        seperator: '#'
      }
    ],
    seperator: ' ',
    attachPoint: '.hpe-product-list__meta',
    pageType: 'category'
  },
  '/search': {
    targetSelector: '.hpe-product-list__row',
    skuSelectors: [
      {
        selector: '.hpe-featured-product__feature li:first-child',
        seperator: ' '
      },
      {
        selector: '.hpe-product-sku',
        seperator: '#'
      }
    ],
    seperator: ' ',
    attachPoint: '.hpe-product-list__meta',
    pageType: 'search'
  },
  '/p/': {
    targetSelector: '.hpe-product-gallery',
    skuSelectors: [
      {
        selector: '.hpe-featured-product__feature li:first-child',
        seperator: ' '
      },
      {
        selector: '.hpe-product-sku',
        seperator: '#'
      }
    ],
    seperator: ' ',
    attachPoint: '.pdp-image-gallery',
    pageType: 'pdp'
  },
  '/cart': {
    targetSelector: '.hpe-cart-list__section-body',
    skuSelectors: [
      {
        selector: '.hpe-cart-list__config-item .hpe-cart-list__text--heavy',
        seperator: ''
      },
      {
        selector: '.hpe-cart-list__meta-block',
        seperator: '#'
      }
    ],
    attachPoint: '.hpe-cart-list__price-block',
    pageType: 'cart'
  },
  '/my-quotes': {
    targetSelector: '.hpe-cart-list__section-lines > .row',
    skuSelectors: [
      {
        selector: '.hpe-cart-list__config-item .hpe-cart-list__text--heavy',
        seperator: ''
      },
      {
        selector: '.hpe-cart-list__meta-block',
        seperator: '#'
      }
    ],
    attachPoint: '.hpe-cart-list__meta-block',
    pageType: 'quotes'
  },
  '/order/': {
    targetSelector: '.hpe-cart-list__section-lines > .row',
    skuSelectors: [
      {
        selector: '.hpe-cart-list__config-item > div:first-child',
        seperator: ''
      },
      {
        selector: '.hpe-cart-list__meta-block',
        seperator: '#'
      }
    ],
    attachPoint: '.hpe-cart-list__section-lines > .row >div:last-child',
    pageType: 'orders'
  },
  '/orderApprovalDetails': {
    targetSelector: '.hpe-cart-list__section-lines > .row',
    skuSelectors: [
      {
        selector: '.hpe-cart-list__text--heavy',
        seperator: ''
      },
      {
        selector: '.hpe-cart-list__meta-block',
        seperator: '#'
      }
    ],
    attachPoint: '.hpe-cart-list__section-lines > .row >div:last-child',
    pageType: 'orders'
  },
  '/favorites/': {
    targetSelector: ''
  },
  '/createQuoteView': {
    targetSelector: '.hpe-cart-list__section-lines > .row',
    skuSelectors: [
      {
        selector: '.hpe-cart-list__config-item .hpe-cart-list__text--heavy',
        seperator: ''
      },
      {
        selector: '.hpe-cart-list__meta-block',
        seperator: '#'
      }
    ],
    attachPoint: 'hpe-cart-list__meta-block',
    pageType: 'quotes'
  },
  '/quoteConfirmSummary': {
    targetSelector: '.hpe-cart-list__section-lines > .row',
    skuSelectors: [
      {
        selector: '.hpe-cart-list__config-item .hpe-cart-list__text--heavy',
        seperator: ''
      },
      {
        selector: 'hpe-cart-list__meta-block',
        seperator: '#'
      }
    ],
    attachPoint: '.hpe-cart-list__meta-block',
    pageType: 'quotes'
  },
  '/createCheckoutView': {
    targetSelector: '.hpe-cart-list__section-lines > .row',
    skuSelectors: [
      {
        selector: '.hpe-cart-list__config-item .hpe-cart-list__text--heavy',
        seperator: ''
      },
      {
        selector: '.hpe-cart-list__meta-block',
        seperator: '#'
      }
    ],
    attachPoint: 'span.hpe-cart-list__meta-block',
    pageType: 'quotes'
  }
};

export const ecoLabelConfig = [
  {
    name: 'energy_star',
    href: 'https://www.energystar.gov/productfinder/?s=mega',
    src: 'https://fe-test-dev.s3.amazonaws.com/hpe/hpe-elite-matinfo-rfp-portal-including-carbon-footprints/Energy_Star_Logo.png',
    title: 'Energy Star'
  },
  {
    name: 'epeat',
    href: 'https://epeat.net/search-servers',
    src: 'https://fe-test-dev.s3.amazonaws.com/hpe/hpe-elite-matinfo-rfp-portal-including-carbon-footprints/EPEAT_logo_transprent_bg.png',
    title: 'Epeat'
  },
  {
    name: 'tco',
    href: 'https://tcocertified.com/',
    src: 'https://fe-test-dev.s3.amazonaws.com/hpe/hpe-elite-matinfo-rfp-portal-including-carbon-footprints/TCO_logo_transparent_bg.png',
    title: 'TCO Certified'
  }
];
