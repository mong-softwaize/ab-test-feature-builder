export const hero = (id) => {
  const html = `
        <div class="ns-20-main-container ${id}__hero-section">
            <div class="ns-20-text-wrapper">
                <div>
                    <h1 class="header-main-message large">
                        <small>Healthy living made easy</small>
                        <strong>Reach your goals</strong>
                        <span>and stay there</span>
                    </h1>
                    <p class="header-secondary-message">
                        Kickstart weight-loss, reset your healthy habits &amp; feel your best. Our natural juices are packed
                        with fruit and veg to get you feeling healthier, cleanse your body, crush your cravings and keep you on
                        track!
                    </p>
                </div>
                <div class="ns-20-mobile-anchor">
                    <a href="https://www.nutriseed.co.uk/pages/52-club" class="button--with-hand">Join the 5:2 Club </a>
                    <a href="/products/cold-pressed-juice-cleanse"
                    class="shop-juice button--with-hand lpg-button ns-11-1-cta">Shop Juice Cleanse</a>
                    <div class="${id}__reviews">
                        <div class="${id}__text">Excellent</div>
                        <div class="${id}__image">
                            <img src="https://storage.googleapis.com/abtest-img-bucket/trust-banner.png"/>
                        </div>
                    </div>
                </div>
                <div class="${id}__button-container">
                    <div >
                        <a href="https://www.nutriseed.co.uk/pages/52-club" "="" class="lpg-button button--with-hand ns-11-1-cta ${id}__join-club">Join the 5:2 Club </a>
                    </div>
                    <div>
                        <a href="/products/cold-pressed-juice-cleanse" class="ns-20-shop-juice-CTA ${id}__shop-juice lpg-button button--with-hand ns-11-1-cta">Shop Juice Cleanse</a>
                    </div>
                    <div class="${id}__reviews">
                        <div class="${id}__text">Excellent</div>
                        <div class="${id}__image">
                            <img src="https://storage.googleapis.com/abtest-img-bucket/trust-banner.png"/>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <h1 class="header-main-message small">
                    <small>Healthy living made easy</small>
                    <strong>Reach your goals</strong>
                    <span>and stay there</span>
                </h1>
                <img src="https://storage.googleapis.com/abtest-img-bucket/ns41-v4-banner-desktop-2x.png" class="${id}__desktop-image">
                <div class="${id}__mobile-image-wrapper">
                    <img src="https://storage.googleapis.com/abtest-img-bucket/ns41-v4-banner-mobile-2x.png" class="${id}__mobile-image">
                    <div class="custom-shape-divider-bottom">
                    </div>
                </div>
            </div>
        </div>
    `;
  return html;
};
