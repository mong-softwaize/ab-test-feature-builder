import newsItem from './newsItem';

const newsItems = (id, newsFeed) => {
  const htmlStr = `   
    <div class="${id}__newsitems card-block">
        <div class="${id}__toprow">
            <h2 class="card-title">Senaste nyheter</h2>
        </div>
        <div class="${id}__newsitems-wrapper">
            ${newsFeed.map((item) => newsItem(id, item)).join('\n')}
        </div>
        <a href="/nyheter" class="${id}__learnmore seeallnews">Fler nyheter</a>
    </div>
    `;

  return htmlStr.trim();
};

export default newsItems;
