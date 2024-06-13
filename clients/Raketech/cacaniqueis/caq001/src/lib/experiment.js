import setup from './services/setup';
import shared from './shared/shared';
import heroSection from './components/heroSection';
//eslint-disable-next-line import/no-unresolved
//eslint-disable-next-line import/extensions, import/no-unresolved
import initSwiper from './helpers/initSwiper';
import gaTracking from './services/gaTracking';

const { ID, VARIATION } = shared;

const slideInfo = [
  {
    contentImg:
      'https://img.cacaniqueisonline.com/wp-content/uploads/2020/10/cleopatra-igt_new.jpg?fit=max&h=180&w=235',
    bgImage:
      'https://raketect-cro-public.s3.ap-southeast-2.amazonaws.com/images/cacaniqueisonline/Play-Cleopatra-bg.png',
    casinoName: 'Play Cleopatra',
    title: 'Cleopatra Slot',
    text: 'A lenda da mulher mais famosa da história continua... Esse mistério aguarda você no caça-níquel Cleopatra, bem aqui.',
    btnFirstTxt: 'JOGUE Cleopatra AGORA',
    btnFirstLink: '/caca-niquel/cleopatra/',
    btnFirstLabel: 'Play Cleopatra',
    btnSecondTxt: 'JOGUE SLOTS ONLINE DE GRAÇA',
    btnSecondLink: '/slots',
    btnSecondLabel: 'All Slots',
    order: VARIATION === '1' ? 1 : VARIATION === '2' ? 2 : 3
  },
  {
    contentImg:
      'https://raketect-cro-public.s3.ap-southeast-2.amazonaws.com/images/cacaniqueisonline/bonus-casino-content-img.png',
    bgImage:
      'https://raketect-cro-public.s3.ap-southeast-2.amazonaws.com/images/cacaniqueisonline/bonus-casino-bg.png',
    title: 'Bônus de Cassino',
    casinoName: 'Bonus Casino',
    text: 'Aproveite ao máximo sua experiência com bônus de boas-vindas, rodadas grátis e promoções',
    btnFirstTxt: 'Explore Todos os bônus',
    btnFirstLink: '/free-spins',
    btnSecondTxt: 'Ver Jogadas Grátis',
    btnSecondLink: '/bonus-casino/',
    btnSecondLabel: 'Play Free',
    order: VARIATION === '1' ? 2 : VARIATION === '2' ? 3 : 1
  },
  {
    contentImg:
      'https://raketect-cro-public.s3.ap-southeast-2.amazonaws.com/images/cacaniqueisonline/kto-casino-content-img.png',
    bgImage:
      'https://raketect-cro-public.s3.ap-southeast-2.amazonaws.com/images/cacaniqueisonline/kto-casino-bg.png',
    title: 'KTO Cassino:',
    casinoName: 'KTO Cassino',
    text: 'R$ 200 de Bônus de boas-vindas! Descubra tudo o que eles têm a oferecer em nossa análise.',
    btnFirstTxt: 'Leia mais sobre KTO',
    btnFirstLink: '/kto',
    btnFirstLabel: 'Read More',
    btnSecondTxt: 'Explore Todos os Cassinos',
    btnSecondLink: '/cassino-online-brasil/',
    btnSecondLabel: 'All Casinos',
    order: VARIATION === '1' ? 3 : VARIATION === '2' ? 1 : 2
  }
];

const init = () => {
  if (document.querySelector(`.${ID}__hero`)) {
    document.querySelector(`.${ID}__hero`).remove();
  }
  console.log('ID: ', ID);

  document
    .querySelector('.hero_carousel')
    .insertAdjacentHTML('afterend', heroSection(ID, VARIATION, slideInfo));
  initSwiper(ID);
};

export default () => {
  setup();

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__slide-img-link`)) {
      const { name, index } = target.closest(`.${ID}__slide`).dataset;
      gaTracking(`${name} | ${index} | Image`);
    } else if (target.closest(`.${ID}__slide-btn.btn-yellow`)) {
      const { index } = target.closest(`.${ID}__slide`).dataset;
      const { text } = target.closest(`.${ID}__slide-btn.btn-yellow`).dataset;
      gaTracking(`${text} | ${index} | Yellow CTA`);
    } else if (target.closest(`.${ID}__slide-btn.btn-gray`)) {
      const { index } = target.closest(`.${ID}__slide`).dataset;
      const { text } = target.closest(`.${ID}__slide-btn.btn-gray`).dataset;
      gaTracking(`${text} | ${index} | Grey CTA`);
    } else if (
      target.closest('.section.section_top') &&
      target.closest('.button.button_secondary')
    ) {
      gaTracking('All Slots | Yellow CTA');
    } else if (target.closest('.section.section_top') && target.closest('.button.button_hero')) {
      gaTracking('All Casinos | Grey CTA');
    }
  });

  if (VARIATION === 'Control') {
    return;
  }

  init();
};
