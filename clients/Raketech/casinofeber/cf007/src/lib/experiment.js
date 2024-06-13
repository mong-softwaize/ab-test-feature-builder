import { observeDOM } from './helpers/utils';
import gaTracking from './services/gaTracking';
import setup from './services/setup';

import shared from './shared/shared';

const { ID } = shared;
const init = (data) => {
  const { backgroudColor, casinoImage, casinoname, disclaimerUrl, messagebody, termsUrl, url } =
    data;
  const htmlStr = `<div class='${ID}__cardContainer'>
        <div class='${ID}__card'>
            <div class='${ID}__cardHeader'>
                <span class='${ID}__header-text'>Månadens Casino</span>
                <span class='${ID}__header-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                        <path d="M12.6104 15.2H5C3.89543 15.2 3 14.3045 3 13.2V7.69995H5.67963C6.34834 7.69995 6.9728 7.36575 7.34373 6.80935L9.03075 4.27883C9.4801 3.60481 10.2366 3.19995 11.0467 3.19995C11.5457 3.19995 11.9253 3.64807 11.8433 4.14033L11.25 7.69995H13.3104C14.5725 7.69995 15.5191 8.8546 15.2716 10.0922L14.5716 13.5922C14.3846 14.527 13.5638 15.2 12.6104 15.2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 7.69995V15.2" stroke="white" stroke-width="2"/>
                    </svg>
                </span>
            </div>
            <div class='${ID}__cardBody'>
                    <a class="${ID}__logo img" style="background-color:${backgroudColor}" href="${url}" rel="nofollow noreferrer">
                        <img loading="eager" alt="${casinoname}" src="${casinoImage}">
                    </a>
                <div class='${ID}__content'>
                    <div class='${ID}__content-details'>
                        <span class='details'>${messagebody}</span>
                        <div class="${ID}__toplist-terms">
                            Reklamlänk | 18+ | <a href="${termsUrl}" target="_blank" rel="nofollow noreferrer noopener"> Regler &amp; villkor gäller </a> | Spela ansvarsfullt | <a href="${disclaimerUrl}" target="_blank" rel="nofollow noreferrer noopener">stodlinjen.se</a>
                        </div>
                    </div>
                    <a href='${url}' class='${ID}__content-btn' target='_blank'>
                        <span>Till casinot</span>
                    </a>
                </div>
            </div>
        </div>
        <div class='${ID}__footer'>
            <div class="${ID}__toplist-terms">
                Reklamlänk | 18+ | <a href="/spela/turbonino/villkor" target="_blank" rel="nofollow noreferrer noopener"> Regler &amp; villkor gäller </a> | Spela ansvarsfullt | <a href="https://www.stodlinjen.se" target="_blank" rel="nofollow noreferrer noopener"> stodlinjen.se</a>
            </div>
        </div>
    </div>`;
  const anchorPoint = document.querySelector('.toplist-holder');
  if (!document.querySelector(`.${ID}__cardContainer`)) {
    anchorPoint.insertAdjacentHTML('afterbegin', htmlStr);
  }
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    if (e.target.closest(`.${ID}__logo`) || e.target.closest(`.${ID}__content-btn`)) {
      gaTracking('top-banner-position-0');

      const casinoNameElem = e.target.closest('a');
      const casinoName = casinoNameElem.getAttribute('href').split('/')[2];
      gaTracking(`User clicked promoted casino: ${casinoName}`);

      const elemClicked = e.target.closest(`.${ID}__logo`) ? 'logo' : 'button';
      gaTracking(`top-banner-position-0 | ${elemClicked}`);
    }
  });

  //get Data from API
  const getData = async (endpoint, key = 'AB_data') => {
    const BASE_URL = 'https://cf-abtest-datastore.s3.ap-southeast-2.amazonaws.com';
    const url = `${BASE_URL}${endpoint}`;

    //Check if the data is already in session storage
    const data = sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }

    //Make a fetch call to get the data
    const response = await fetch(url);
    if (!response.ok) {
      sessionStorage.removeItem(key);
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const fetchedData = await response.json();
    console.log('fetchedData:', fetchedData);

    //Store the fetched data in session storage
    sessionStorage.setItem(key, JSON.stringify(fetchedData));

    return fetchedData;
  };
  const apiKeySuffix = `${ID}__apiData`;
  getData('/promotedcasino.json', apiKeySuffix).then((data) => {
    init(data[0]);
    observeDOM('.toplist-holder', () => {
      init(data[0]);
    });
  });
};
