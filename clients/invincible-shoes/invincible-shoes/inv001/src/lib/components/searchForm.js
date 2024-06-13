const searchForm = (id) => {
  const htmlString = `
    
    <form class="search-form search-bar__form ${id}__search-form"
        action="/search"
        method="get"
        role="search">
        <div class="search-form__input-wrapper" >
            <input type="text"
                    name="q"
                    placeholder="Search"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-owns="predictive-search-results"
                    aria-expanded="true"
                    aria-label="Search"
                    aria-haspopup="listbox"
                    class="search-form__input search-bar__input"
                    data-predictive-search-drawer-input=""
                    autocorrect="off"
                    autocomplete="off"
                    autocapitalize="off"
                    spellcheck="false"
                    aria-activedescendant="">
            <input type="hidden"
                    name="options[prefix]"
                    value="last"
                    aria-hidden="true">
            <div class="predictive-search-wrapper predictive-search-wrapper--drawer "
                data-predictive-search-mount="drawer"
                style="top: 44px; max-height: 754.5px; z-index:9999">
                <div class="predictive-search">
                    <div class="predictive-search-title">
                        <h3 id="predictive-search"
                            class="predictive-search-title__content">Products</h3><span
                                class="predictive-search-title__loading-spinner"></span>
                    </div>
                    <ul id="predictive-search-results"
                        class="predictive-search__list ${id}__predictive-search__list"
                        role="listbox"
                        aria-labelledby="predictive-search">
                        
                    </ul>
                </div>
            </div>
            <div style="position: absolute !important; overflow: hidden; clip: rect(0 0 0 0); height: 1px; width: 1px; margin: -1px; padding: 0; border: 0;"
                data-search-announcer=""
                aria-live="polite"
                aria-atomic="true">4 results found</div>
            <button class="search-bar__submit search-form__submit"
                type="submit"
                data-search-form-submit="">
            <svg aria-hidden="true"
                focusable="false"
                role="presentation"
                class="icon icon-search"
                viewBox="0 0 37 40">
                <path
                        d="M35.6 36l-9.8-9.8c4.1-5.4 3.6-13.2-1.3-18.1-5.4-5.4-14.2-5.4-19.7 0-5.4 5.4-5.4 14.2 0 19.7 2.6 2.6 6.1 4.1 9.8 4.1 3 0 5.9-1 8.3-2.8l9.8 9.8c.4.4.9.6 1.4.6s1-.2 1.4-.6c.9-.9.9-2.1.1-2.9zm-20.9-8.2c-2.6 0-5.1-1-7-2.9-3.9-3.9-3.9-10.1 0-14C9.6 9 12.2 8 14.7 8s5.1 1 7 2.9c3.9 3.9 3.9 10.1 0 14-1.9 1.9-4.4 2.9-7 2.9z">
                </path>
            </svg>
    
        </button>
    </div>

    
    </form>`;

  return htmlString;
};

export default searchForm;
