import { formatNumber } from '../helpers/utils';

export const button = (id, percentage = '', oldPrice = 0, sellPrice = 0) => {
  const isDisabled = oldPrice === 0 ? 'disabled=true' : '';
  const isStrikeThrough = sellPrice !== 0 ? 'strikeThrough' : '';
  const html = `
        <div class="${id}__checkboxBtn">
            <div class="${id}__calculation">
                <span class="${id}__text">Subtotal: </span>
                <span class="${id}__price ${isStrikeThrough}">$${formatNumber(oldPrice)}</span>
                 ${sellPrice != 0 ? `<span class="${id}__sellPrice">$${formatNumber(sellPrice)}</span>` : ''}
                ${percentage != '' ? `<span class="${id}__percenteage">${percentage}</span>` : ''}
            </div>
            <button type="button" ${isDisabled} class="${id}__Button">Checkout</button></div>
        </div>
    `;
  return html;
};

export const buttonV2 = (id, oldPrice = 0, sellPrice = 0) => {
  const isDisabled = oldPrice === 0 ? 'disabled=true' : '';
  const isStrikeThrough = sellPrice !== 0 ? 'strikeThrough' : '';
  const html = `
        <div class="${id}__checkboxBtn">
            <button type="button" ${isDisabled} class="${id}__Button">
                  <span>Checkout: </span>
                  <span class="${id}__price ${isStrikeThrough}">$${formatNumber(oldPrice)}</span>
                   ${sellPrice != 0 ? `<span class="${id}__sellPrice">$${formatNumber(sellPrice)}</span>` : ''}
            </button>
        </div>
    `;
  return html;
};
