import setup from './services/setup';
import shared from './shared/shared';
import { colorSwatches } from './components/colorSwatches';
import { robesProductData } from './data/data';
import { minusIcon, plusIcon } from './assets/icons';

const { ID, VARIATION } = shared;
const THRESHOLD_IMAGE_NUMBER = 4;

const changeIcon = (icon, text) => {
  const iconElement = document.querySelector(`.${ID}__icon`);
  iconElement.innerHTML = icon;
  iconElement.dataset.attr = text;
};

const init = () => {
  const targetElement = document.querySelector('form[id^="product_form"]');
  const { pathname } = window.location;
  const productHandle = pathname.split('/products/')[1];
  const data = robesProductData[productHandle];

  const translationConfig = {
    nl: 'Kleur',
    de: 'Farbe',
    fr: 'Couleur',
    es: 'color',
    en: 'Color'
  };

  const lang = window.langify.locale.iso_code;
  const colorMsg = translationConfig[lang];

  if (document.querySelector(`.${ID}__colorSwatches`)) {
    document.querySelector(`.${ID}__colorSwatches`).remove();
  }
  data &&
    targetElement.insertAdjacentHTML(
      'afterbegin',
      colorSwatches(ID, data, colorMsg, THRESHOLD_IMAGE_NUMBER)
    );
};

export default () => {
  setup();

  if (VARIATION === 'control') {
    return;
  }

  const handleIconClick = ({ target }) => {
    const iconElement = target.closest(`.${ID}__icon`);
    if (!iconElement) return;

    const action = iconElement.dataset.attr;
    if (action === 'more') {
      const hideElements = document.querySelectorAll(`.${ID}__color-item.${ID}__hide`);
      hideElements.forEach((item) => item.classList.remove(`${ID}__hide`));
      changeIcon(minusIcon, 'less');
    } else if (action === 'less') {
      const elements = document.querySelectorAll(`.${ID}__color-item`);
      elements.forEach((item, index) => {
        if (index > THRESHOLD_IMAGE_NUMBER) {
          item.classList.add(`${ID}__hide`);
        }
      });
      changeIcon(plusIcon, 'more');
    }
  };
  document.body.removeEventListener('click', handleIconClick);

  document.body.addEventListener('click', handleIconClick);

  init();
};
