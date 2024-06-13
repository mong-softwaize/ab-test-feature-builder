const giftQuestion = (id) => {
  const htmlStr = `<div class="${id}__container">
        <div class="${id}__label-wrapper">
            <label class="${id}__giftcheckbox-label">
                <input type="checkbox"
                    id="${id}__giftcheckbox"
                    name="${id}__giftcheckbox">
                <span class="checkmark"></span>
                <span class="question">This order contains a gift</span>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none">
                    <path d="M15.4193 4.25032H17.6831C17.6831 1.7835 15.7046 3.05176e-05 13.2041 3.05176e-05C11.878 3.05176e-05 10.7452 0.562466 9.97366 1.45873C10.707 2.25246 11.1055 3.09173 11.1055 4.25032C11.1055 3.01691 11.9539 2.23332 13.2041 2.23332C14.4544 2.23332 15.4193 3.01691 15.4193 4.25032Z"
                        fill="#7F28C4" />
                    <path fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.26425 4.25032C2.26425 1.7835 4.1261 3.05176e-05 6.62659 3.05176e-05C7.95268 3.05176e-05 9.14562 0.562466 9.97366 1.45873C10.707 2.25246 11.1055 3.09173 11.1055 4.25032H8.84178C8.84178 3.01691 7.87684 2.23332 6.62659 2.23332C5.37635 2.23332 4.52802 3.01691 4.52802 4.25032H8.84178V10.9502H0.0268098V6.14403C0.196708 5.05456 1.14692 4.25032 2.26425 4.25032ZM8.84178 13.1835H0.0268098V18.4271C-0.18416 19.78 0.876827 21 2.26426 21H8.84178V13.1835ZM11.1055 10.9502V4.25032H17.7357C18.8531 4.25032 19.8033 5.05455 19.9732 6.14403V10.9502H11.1055ZM11.1055 21V13.1835H19.9732V18.4271C20.1842 19.78 19.1232 21 17.7357 21H11.1055Z"
                        fill="#7F28C4" />
                </svg>
            </label>
        </div>
    </div>`;

  return htmlStr.trim();
};

export default giftQuestion;
