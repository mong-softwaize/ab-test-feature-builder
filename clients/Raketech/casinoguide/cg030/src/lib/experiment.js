/*eslint-disable no-useless-escape */
/*eslint-disable no-param-reassign */
import setup from './services/setup';
import gaTracking from './services/gaTracking';
import shared from './shared/shared';
import { getCroStorage, onUrlChange, setCroStorage } from './helpers/utils';
import affiliateLinksConfig from './affiliateLinksConfig';

const { ID, VARIATION } = shared;
const linkType = VARIATION === 'Control' ? 'A Link' : 'B Link';
const init = () => {
  const casinoData = getCroStorage(`${ID}__visitedCasinos`);
  if (!casinoData) return;
  //console.log('🚀 ~ file: experiment.js:14 ~ init ~ casinoData:', casinoData);
  casinoData.forEach((casino) => {
    const casinoLinks = document.querySelectorAll(`a[data-oldhref*="${casino}"]`);
    casinoLinks.forEach((casinoLink) => {
      //console.log('🚀 ~ file: experiment.js:17 ~ casinoData.forEach ~ casinoLinks:', casinoLinks);
      const casinoCardElem = casinoLink?.closest('.mui-229w2h');
      if (!casinoCardElem) return;
      casinoCardElem.classList.add(`${ID}__grayscale`);
    });
  });
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (!target.closest('a[href*="/go/"]') && target.closest(`.${ID}__affiliate`) && target.closest('.mui-isbt42')) {
      const closestWrapper = target.closest('a');
      const casinoLink = closestWrapper.dataset.oldhref || closestWrapper.href;
      const casinoName = casinoLink.split('/go/')[1];

      //const hasAffiliateLink = target.closest(`.${ID}__affiliate`);
      const clikedElem = target.closest('a.img') ? 'logo' : 'button';

      gaTracking(`${linkType} | ${casinoName.replace(/\//g, '')} | CTA Clicks to Operator | Toplist${target.closest(`.${ID}__grayscale`) ? ' | Greyscaled' : ''} (${clikedElem})`);

      const data = getCroStorage(`${ID}__visitedCasinos`);
      if (!data) {
        const casinoNameArr = [casinoName];
        setCroStorage(`${ID}__visitedCasinos`, casinoNameArr);
        init();
        return;
      }
      const visitedCasinos = getCroStorage(`${ID}__visitedCasinos`) || [];
      if (visitedCasinos.includes(casinoName)) return;
      visitedCasinos.push(casinoName);
      setCroStorage(`${ID}__visitedCasinos`, visitedCasinos);
      init();
    } else if (target.closest('a[href*="/go/"]') && !target.closest(`.${ID}__affiliate`) && target.closest('.mui-isbt42')) {
      const operatorHref = target.closest('a[href*="/go/"]').href;
      const operatorName = operatorHref.split('/go/')[1];
      const clikedElem = target.closest('a.img') ? 'logo' : 'button';

      gaTracking(`Default link | ${operatorName.replace(/\//g, '')} | CTA Clicks to Operator${target.closest(`.${ID}__grayscale`) ? ' | Greyscaled' : ''} (${clikedElem})`);
      const data = getCroStorage(`${ID}__visitedCasinos`);
      if (!data) {
        const casinoNameArr = [operatorName];
        setCroStorage(`${ID}__visitedCasinos`, casinoNameArr);
        init();
        return;
      }
      const visitedCasinos = getCroStorage(`${ID}__visitedCasinos`) || [];
      if (visitedCasinos.includes(operatorName)) return;
      visitedCasinos.push(operatorName);
      setCroStorage(`${ID}__visitedCasinos`, visitedCasinos);
      init();
    } else if (target.closest('.mui-1ckh6ov') && !target.closest('.mui-18d5ns0')) {
      const operatorHref = target.closest('a').href;

      const operatorName = operatorHref.split('se/')[1];
      console.log('🚀operatorName:', operatorHref, operatorName);
      gaTracking(`${operatorName} CTA Clicks to Review (Logo) ${target.closest(`.${ID}__grayscale`) ? ' | Greyscaled' : ''}`);
    } else if (target.closest('.mui-18d5ns0')) {
      const operatorHref = target.closest('a').href;

      const operatorName = operatorHref.split('se/')[1];
      console.log('🚀operatorName:', operatorHref, operatorName);
      gaTracking(`${operatorName} CTA Clicks to Review (Button) ${target.closest(`.${ID}__grayscale`) ? ' | Greyscaled' : ''}`);
    }
  });

  const updateAffiliateLinks = () => {
    const casinoToplistItems = document.querySelectorAll('.mui-isbt42 .mui-229w2h');
    casinoToplistItems.forEach((casinoToplistItem) => {
      const casinoBtnElem = casinoToplistItem.querySelector('a[data-operator]');
      //const casinoImgElem = casinoToplistItem.querySelector('a.img');

      if (!casinoBtnElem) return;
      const casinoHref = casinoBtnElem.href;
      if (!casinoHref.includes('/go/')) return;
      const casinoName = casinoHref.split('/go/')[1].replace(/[\/\-_]/g, '');

      const newUrl = affiliateLinksConfig[linkType][casinoName];
      //console.log('🚀newUrl:', newUrl);

      casinoBtnElem.setAttribute('data-oldhref', casinoHref);
      //casinoImgElem.setAttribute('data-oldhref', casinoHref);
      if (newUrl) {
        casinoBtnElem.classList.add(`${ID}__affiliate`);
        casinoBtnElem.setAttribute('data-name', casinoName);
        casinoBtnElem.href = newUrl;
        //casinoImgElem.classList.add(`${ID}__affiliate`);
        //casinoImgElem.setAttribute('data-name', casinoName);
        //casinoImgElem.href = newUrl;
      }
      //console.log('🚀casinoName:', casinoName);
    });
  };

  updateAffiliateLinks();

  init();
  onUrlChange(() => {
    updateAffiliateLinks();
    init();
  });
};
