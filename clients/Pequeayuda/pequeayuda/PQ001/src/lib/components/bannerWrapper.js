import bannerItem from './bannerItem';
export const bannerWrapper = (id, data) => {
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
