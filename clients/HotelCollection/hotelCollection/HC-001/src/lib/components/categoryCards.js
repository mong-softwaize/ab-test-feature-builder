import categoryCard from './categoryCard';

const categoryCards = (id, data) => {
  const htmlStr = `
            <div class="${id}__container">
                <div class="${id}__title">SHOP BY CATEGORY</div>
                <div class="scrollable-wrapper">
                    <div class='${id}__categoryCards'>
                        ${data?.map((category) => categoryCard(id, category)).join('')}
                    </div>
                </div>
            </div>
    
    `;

  return htmlStr;
};
export default categoryCards;
