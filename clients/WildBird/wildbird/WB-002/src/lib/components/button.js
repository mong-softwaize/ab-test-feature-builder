export const button = (id) => {
  const html = `
        <div class="${id}__checkboxBtn">
            <div class="${id}__calculation">
                <span class="${id}__text">Subtotal: </span>
                <span class="${id}__price">$0.00 </span>
                <span class="${id}__sellPrice">$0.00</span>
                <span class="${id}__percenteage">10% OFF</span>

            </div>
            <button type="button" class="Button">Checkout</button></div>
        </div>
    `;
  return html;
};
