import setup from './services/setup';
import shared from './shared/shared';
import { roomVisualiser } from './components/roomVisualiser';
import { images } from './components/images';
import counter from './components/counter';

import { wrapInner, pollerLite } from './helpers/utils';

const { ID } = shared;
const MIN_IMAGES_OF_PROD = 5;

const insertRoomVisualiser = (parentElem) => {
  if (document.querySelector(`.${ID}__room-visualiser`)) {
    document.querySelector(`.${ID}__room-visualiser`).remove();
  }
  parentElem.insertAdjacentHTML('beforeend', roomVisualiser(ID));
};

const insertCounter = (parentElem, index, size) => {
  if (document.querySelector(`.${ID}__counter`)) {
    document.querySelector(`.${ID}__counter`).remove();
  }
  parentElem.insertAdjacentHTML('beforeend', counter(ID, index, size));
};

const fullSizeScreen = (keyValue, fotoramaData) => {
  fotoramaData.show(parseInt(keyValue));
  fotoramaData.requestFullScreen();
};

const checkVideoContainer = () => {
  if (
    document.querySelector(
      '.fotorama__stage .fotorama__stage__frame.fotorama-video-container.video-unplayed'
    )
  ) {
    document.querySelector(`.${ID}__room-visualiser`)?.classList.remove(`${ID}__hide`);
  }

  if (
    document.querySelector(
      '.fotorama__stage .fotorama__stage__frame.fotorama-video-container.fotorama__active:not(.video-unplayed)'
    )
  ) {
    document.querySelector(`.${ID}__room-visualiser`)?.classList.add(`${ID}__hide`);
  }
};

export default () => {
  setup();

  const fotoramaData = window.jQuery('.fotorama').data('fotorama');
  const gallery = document.querySelector('.gallery-placeholder');
  const parentElement = document.querySelector('.fotorama__stage');

  //room visualiser add

  pollerLite(['div[data-role="roomvo"] > .roomvo-stimr'], () => {
    insertRoomVisualiser(parentElement);
    insertCounter(parentElement, fotoramaData.activeIndex, fotoramaData.size);
  });

  //insert other images
  if (fotoramaData.data.length) {
    const { data } = fotoramaData;
    if (document.querySelector(`.${ID}__images-wrapper.desktop`)) {
      document.querySelector(`.${ID}__images-wrapper.desktop`).remove();
    }

    if (document.querySelector(`.${ID}__images-wrapper.mobile`)) {
      document.querySelector(`.${ID}__images-wrapper.mobile`).remove();
    }

    //desktop
    data.slice(1).length &&
      gallery.insertAdjacentHTML(
        'afterend',
        images(ID, data.slice(1), MIN_IMAGES_OF_PROD, 'desktop')
      );
    //mobile
    data.length &&
      gallery.insertAdjacentHTML('afterend', images(ID, data, MIN_IMAGES_OF_PROD, 'mobile'));
  }

  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__room-visualiser`)) {
      e.preventDefault();
      e.stopPropagation();
      document.querySelector('div[data-role="roomvo"] .roomvo-stimr').click();
      setTimeout(() => {
        fotoramaData.cancelFullScreen();
      }, 200);
    } else if (target.closest(`.${ID}__button-wrapper.more`)) {
      document.querySelector(`.${ID}__images-wrapper.desktop`).classList.add('open');
      document.body.classList.add('makeSticky');
      document
        .querySelectorAll(`.${ID}__hide`)
        .forEach((item) => item && item.classList.remove(`${ID}__hide`));
    } else if (target.closest(`.${ID}__button-wrapper.less`)) {
      document.querySelector(`.${ID}__images-wrapper.desktop`).classList.remove('open');
      document.body.classList.remove('makeSticky');
      const imageItems = [
        ...document.querySelectorAll(`.${ID}__images-wrapper.desktop .${ID}__image-item`)
      ];
      imageItems
        .slice(MIN_IMAGES_OF_PROD - 1)
        .forEach((item) => item && item.classList.add(`${ID}__hide`));

      gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    } else if (
      target.closest(`.${ID}__image-item`) &&
      target.closest(`.${ID}__images-wrapper.desktop`)
    ) {
      const keyValue = target.closest(`.${ID}__image-item`).dataset.key;
      fullSizeScreen(keyValue, fotoramaData);
      if (target.closest(`.${ID}__image-item`).dataset.type === 'video') {
        gallery.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    } else if (
      target.closest(`.${ID}__image-item`) &&
      target.closest(`.${ID}__images-wrapper.mobile`)
    ) {
      const keyValue = target.closest(`.${ID}__image-item `).dataset.key;
      fullSizeScreen(keyValue, fotoramaData);
    }

    setTimeout(() => {
      if (fotoramaData.activeIndex !== 0) {
        insertCounter(parentElement, fotoramaData.activeIndex, fotoramaData.size);
        checkVideoContainer();
      } else if (fotoramaData.activeIndex === 0) {
        insertCounter(parentElement, fotoramaData.activeIndex, fotoramaData.size);
        checkVideoContainer();
      }
    }, 300);
  });

  wrapInner('.product-info-main', {
    class: `${ID}__wrapper-class`
  });
};
