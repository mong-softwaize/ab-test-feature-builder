const uspsPdp = (id) => {
  const html = `
        <div class="elementor-element e-flex e-con-boxed e-con e-child ${id}__uspsPdp"
            data-element_type="container">
            <div class="e-con-inner">
                <div class="elementor-element elementor-widget elementor-widget-image"
                    data-element_type="widget"
                    data-widget_type="image.default">
                    <div class="elementor-widget-container">
                        <img width="300"
                            height="96"
                            src="https://pequeayuda.com/wp-content/uploads/2023/12/Frame-640-1.png"
                            class="attachment-full size-full ${id}__uspsPdpImage"
                            alt="">
                    </div>
                </div>
            </div>
        </div>
    `;
  return html.trim();
};

export default uspsPdp;
