const bannerItem = (id, data) => {
  const { imageUrl, header, subHeader, btnText, btnLink } = data;
  const html = `
    <div class="swiper-slide ${id}__bannerItem">
      <div class="${id}__bannerItem-slide" style="background-image:url(${imageUrl})">
        <div class="${id}__bannerItem-content">
            <h1>${header}</h1>
            <h2>${subHeader}</h1>
            <a href="${btnLink}" class="${id}__bannerItem-btn">${btnText}</a>
        </div>
      </div>
    </div>
  `;
  return html.trim();
};

export default bannerItem;
