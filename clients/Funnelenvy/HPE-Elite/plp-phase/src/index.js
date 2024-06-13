import activate from './lib/experiment';
import { pollerLite } from '../../../../../globalUtil/util';
import searchPageChanges from './lib/searchPageChanges';
import pdpChanges from './lib/pdpChanges';

//const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const searchPage = window.location.pathname.includes('/search');
const categoryPage = window.location.pathname.includes('/list');
const pdp = window.location.pathname.includes('/productDetails/details');

pollerLite(
  [
    () =>
      window.reqOrgName !== 'MATINFO ECOMMERCE TESTS' &&
      window.userAccount !== 'MATINFO ECOMMERCE TESTS:FR' &&
      window.reqOrgName !== 'MATINFO SALES TESTS' &&
      window.userAccount !== 'MATINFO SALES TESTS:FR' &&
      window.userAccountId !== 'MATINFO2' &&
      window.headerData &&
      (window.headerData.user.account_id === 'FRB2B190325133147' ||
        window.headerData.user.rootorg_id === 'MATI20210608085950')
  ],
  () => {
    if (searchPage) {
      searchPageChanges();
    } else if (categoryPage) {
      activate();
    } else if (pdp) {
      pdpChanges();
    }
  }
);
