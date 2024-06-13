import { formatPrice } from '../helpers/utils';

const promoBanner = (id, data, pageType, isLoggedin) => {
  const loginStatus = isLoggedin ? 'loggedin' : 'notLoggedin';
  const { messages, icon, price } = data;
  const htmlStr = `
    <div class="${id}__promobanner" data-pagetype="${pageType}" data-loginstatus="${loginStatus}">
        <div class="${id}__promobanner--icon">${icon}</div>
        <div class="${id}__promobanner--content">${messages[loginStatus][pageType]}</div>
    </div>`;

  const loginWrappedPromo = `
    <div class="${id}__loginpromo--wrapper" data-pagetype="${pageType}">
        ${htmlStr}
        <div class="login-row">
            <a class="${id}__login" href="/login">Login</a> 
             or 
            <a class="${id}__signup" href="/create-account/cash">Sign Up</a> 
            and get this for ${formatPrice(price * 0.8)}
        </div>
    </div>`;

  return pageType === 'plp' || isLoggedin ? htmlStr.trim() : loginWrappedPromo.trim();
};

export default promoBanner;
