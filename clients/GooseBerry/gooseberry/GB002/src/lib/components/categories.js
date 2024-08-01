const categories = (id, data) => {
  const html = `
    <div class="${id}__categoriesWrapper">
        <h1>SHOP BY CATEGORY</h1>
        <div class="${id}__categoriesContainer">
            ${data
              .map((item) => {
                return `
                    <a class="${id}__categoryItem" href="${item.link}">
                        <div class="${id}__imageWrapper">
                            <img src="${item.imageUrl}" alt="${item.name}" loading="lazy">
                        </div>
                        <h2>${item.name}</h2>
                    </a>
                `;
              })
              .join('\n')}
        </div>
    </div>
  `;
  return html;
};

export default categories;
