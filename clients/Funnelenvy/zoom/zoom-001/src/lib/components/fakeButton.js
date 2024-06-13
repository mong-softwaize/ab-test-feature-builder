export const fakeButton = (id) => {
  const html = `
        <button
        disabled="disabled"
        aria-disabled="true"
        type="button"
        class="text-capitalize opc-signup__main__action-btn zm-button--primary zm-button--large is-disabled is-round zm-button ${id}__fakeButton"
        >
            <span class="zm-button__slot"> continue to address </span>
        </button>
  
    `;
  return html;
};
