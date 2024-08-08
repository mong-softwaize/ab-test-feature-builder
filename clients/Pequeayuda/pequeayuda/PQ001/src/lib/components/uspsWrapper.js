export const uspsWrapper = (id, data) => {
  const html = `
    <div class="${id}__uspsContainer">
        <div class="${id}__uspsBox">
            ${data
              .map((item) => {
                return `
                    <div class="${id}__uspsItem">
                        <div class="${id}__uspsIcon">${item.icon}</div>
                        <div class="${id}__uspsText">${item.text}</div>
                    </div>
                `;
              })
              .join('\n')}
        </div>
    </div>
  `;
  return html.trim();
};
