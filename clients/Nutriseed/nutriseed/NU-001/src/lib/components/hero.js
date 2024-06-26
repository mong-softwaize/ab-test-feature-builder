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
                    <h1 class="mobile-title">Transform your health through plant based nutrition</h1>
                    <h1 class="desktop-title">Transform your health </h1>
                    <h1 class="ns-20-text-sub-title desktop-title">through plant based nutrition</h1>
                    <p class="ns-20-text-content">Intermittent fasting made easy! Our natural juices are designed to cleanse
                        your body, crush your cravings and keep you on track! Packed with fruit and veg to get you feeling
                        healthier.</p>
                </div>
                <div class="ns-20-mobile-anchor">
                    <a href="https://www.nutriseed.co.uk/pages/52-club">Join the 5:2 Club </a>
                    <a href="/products/cold-pressed-juice-cleanse"
                    class="shop-juice">Shop Juice Cleanse</a>
                </div>
                <div class="${id}__button-container">
                    <div >
                        <a href="https://www.nutriseed.co.uk/pages/52-club" "="" class="lpg-button button--with-hand ns-11-1-cta ${id}__join-club">Join the 5:2 Club </a>
                    </div>
                    <div>
                        <a href="/products/cold-pressed-juice-cleanse" class="ns-20-shop-juice-CTA ${id}__shop-juice lpg-button button--with-hand ns-11-1-cta">Shop Juice Cleanse</a>
                    </div>
                </div>
            </div>
            <div>

                <h1 class="header-main-message small">
                    <small>Healthy living made easy</small>
                    <strong>Reach your goals</strong>
                    <span>and stay there</span>
                </h1>
                <img src="https://storage.googleapis.com/abtest-img-bucket/NS%2341-banner-desktop.png" class="${id}__desktop-image">
                <div class="${id}__mobile-image-wrapper">
                <img src="https://storage.googleapis.com/abtest-img-bucket/NS%2341-banner-mobile.png" class="${id}__mobile-image">
                </div>
            </div>


            <svg class="svg">
  <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox"><path d="M0,0.068 C0,0.068,0.119,0.109,0.261,0.109 C0.393,0.109,0.576,-0.017 e-05,236.611,0, C0.848,0.015 e-05,328,5.80205,328,5.80205, V1 H0 V0.068"></path></clipPath>
</svg>
        </div>
    `;
  return html;
};
