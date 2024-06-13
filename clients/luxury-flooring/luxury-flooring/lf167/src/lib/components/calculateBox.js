import { deliveryMessage } from './deliveryMessage';

export const calculateBox = (id, deliveryData) => {
  const html = `
        <div class="${id}__calculateBox">
            <div class="${id}__calculateBox-wrapper">
                <div class="${id}__calculateBox-content">
                    <div class="${id}__calculateBox-content-input">
                        <p>Number of m² required</p>
                        <div class="${id}__input-box">
                            <input type="number" value="0"/>
                            <span class="${id}__quantity">m²</span>
                        </div>
                        <div class='${id}__calculator-openner'>How much do I need?</div>
                    </div>
                    <div class="${id}__vertical-line"></div>
                    <div class="${id}__calculateBox-content-summery">
                        <p>Total</p>
                        <div class="${id}__subtotal">£0.00</div>
                        
                        <div class="${id}__extraInfo">(0 packs / 0m²)</div>
                    </div>
                </div>

                <div class="${id}__calculateBox-atc">
                    <button disabled type="button" title="Add to Basket" class="action primary tocart" id="product-addtocart-button">
                        <span>Add to Basket</span>
                    </button>
                </div>
                ${deliveryMessage(id, deliveryData)}
            </div>
        </div>
    `;
  return html;
};
