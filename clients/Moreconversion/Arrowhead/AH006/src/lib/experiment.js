import setup from './services/setup';
import shared from './shared/shared';

const { VARIATION } = shared;

const removeClass = () => {
  const thumbItems = document.querySelectorAll('.product__thumb-item');
  thumbItems.forEach((item) => {
    if (item.classList.contains('thumb--current')) {
      item.classList.remove('thumb--current');
    }
  });
};
export default () => {
  setup();

  //eslint-disable-next-line no-useless-return
  if (VARIATION === 'Control') return;

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest('.product__thumb-item')) {
      removeClass();
      target.closest('.product__thumb-item').classList.add('thumb--current');
    }
  });

  document.addEventListener('flickity-slide-changed', (e) => {
    removeClass();
    const parentNode = document.querySelector('.product__thumbs-sticky');
    parentNode.childNodes[e.detail.slideIndex].classList.add('thumb--current');
  });
};
