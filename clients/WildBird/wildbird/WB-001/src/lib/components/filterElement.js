import { filterIcon } from '../assets/icons';

export const filterElement = (id) => {
  const html = `
        <div class="${id}__filter">
            <a class="Dropdown__trigger" href="javascript:void(0);">
                <span>FILTER</span>         
            </a>
            <span class="${id}__icon">${filterIcon}</span>
            <span class="arrow"></span>
        </div>
    `;

  return html;
};
