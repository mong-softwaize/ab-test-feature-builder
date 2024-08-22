export const element = (id, info) => {
  console.log('info', info);

  const formtTitle = window.location.pathname.includes('/de/') ? 'Mehr Informationen erhalten' : 'Get more information';
  const { imageSrc, locationName, hotelName, pillsBox, price, perShare, collectHighlightInfo, title } = info;

  const html = `<div class="${id}__elementWrapper">
    <div class="${id}__elementContainer">
      <div class="${id}__element-title">${formtTitle}</div>
      <div class="${id}__elementContainer-mainSection">
        <div class="${id}__elementContainer-imageWrapper">
          <div class="${id}__elementContainer-image">
            <img src="${imageSrc}"/>
            <div class="${id}__pileBox">
              ${pillsBox.outerHTML}
            </div>
          </div>
        </div>
        <div class="${id}__elementContainer-content">
          <p>${locationName}</p>
          <h2>${hotelName}</h2>
          <div class="${id}__priceWarpper">
            <span class="perSharePrice">${price}</span>
            <span class="perShareText">${perShare}</span>
          </div>
          <h5>${title}</h5>
          <div class="${id}__pileBox">
              ${pillsBox.outerHTML}
          </div>
        </div>
      </div>
        ${
          collectHighlightInfo.length
            ? `
            <div class="${id}__elementContainer-footer">
              <div class="${id}__elementContainer-footer-title">Highlights</div>
              <div class="${id}__elementContainer-footer-content">
                ${collectHighlightInfo.map((item) => item.outerHTML).join('\n')}
              </div>
            </div>
          `
            : ''
        }
    </div>
  </div>`;
  return html.trim();
};

export default element;

//
