export const element = (id, info) => {
  console.log('info', info);
  const html = `<div class="${id}__element">Show elements</div>`;
  return html.trim();
};

export default element;

//
