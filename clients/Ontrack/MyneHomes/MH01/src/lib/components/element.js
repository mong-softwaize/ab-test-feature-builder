export const element = (id, info) => {
  console.log('info', info);
  const { imageSrc, locationName, hotelName, pillsBox, price, perShare, collectHighlightInfo, title } = info;

  const html = `<div class="${id}__elementWrapper">
    <div class="${id}__elementContainer">
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
          <div>
            <span>${price}</span>
            <span>${perShare}</span>
          </div>
          <h5>${title}</h5>
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
