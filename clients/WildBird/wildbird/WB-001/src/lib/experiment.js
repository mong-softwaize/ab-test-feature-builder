import setup from './services/setup';
import shared from './shared/shared';
import { filterElement } from './components/filterElement';

const { ID, VARIATION } = shared;
const init = () => {
  const target = document.querySelector('main.Main__content > .Container');
  const collectionNavigation = target.querySelector('.Collection__navigation');
  const parentElement = document.createElement('div');
  parentElement.classList.add(`${ID}__container`);

  if (!target.querySelector(`.${ID}__container`)) {
    collectionNavigation.insertAdjacentElement('afterend', parentElement);
  }

  const prodContainer = document.querySelector(`.${ID}__container + div`);
  parentElement.insertAdjacentElement('beforeend', prodContainer);

  const sidenavBar = `<div class="DropdownContainer">
                          <div class="${ID}__Dropdown__contents">
                              <span class="arrow"></span>
                              <header class="${ID}__sidenav">
                                <div class="Collection__header__nav Container "></div>
                              </header>
                          </div>
                      </div>`;

  parentElement.insertAdjacentHTML('afterbegin', sidenavBar);

  const siteNavContent = document.querySelector('.navigation.u-show--fromTablet');
  if (parentElement.querySelector('.navigation.u-show--fromTablet')) {
    parentElement.querySelector('.navigation.u-show--fromTablet').remove();
  }
  document.querySelector(`.${ID}__sidenav .Collection__header__nav`).insertAdjacentElement('beforeend', siteNavContent);

  //mobile portion

  if (!document.querySelector(`.${ID}__filter`)) {
    collectionNavigation.insertAdjacentHTML('afterbegin', filterElement(ID));
  }
};
export default () => {
  setup();
  console.log(ID, 'TEST');

  if (VARIATION === 'control') return;

  document.body.addEventListener('click', ({ target }) => {
    const mainTarget = target.closest(`.${ID}__filter`);
    if (!mainTarget) return;

    mainTarget.classList.toggle('open');
    document.querySelector(`.${ID}__container`).classList.toggle(`${ID}__mobileDropdownContainer`);
  });

  window.addEventListener(
    'resize',
    () => {
      if (document.querySelector(`.${ID}__container`).classList.contains(`${ID}__mobileDropdownContainer`)) {
        document.querySelector(`.${ID}__filter`).classList.remove('open');
        document.querySelector(`.${ID}__container`).classList.remove(`${ID}__mobileDropdownContainer`);
      }
    },
    true
  );

  init();
};
