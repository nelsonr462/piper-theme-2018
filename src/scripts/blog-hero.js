var sliderConfig = {
  container: '.carousel',
  nav: true,
  controls: false,
  arrowKeys: true,
  navContainer: '.carousel-nav',
  items: 1,
  slideBy: 1,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayButton: false,
  autoplayButtonOutput: false,
  lazyload: true,
  gutter: 10,
  mouseDrag: true
}

var slider = tns(sliderConfig);

// Rebuild carousel in Shopify theme editor after section change
window.addEventListener('shopify:section:load', function(event) {
  if (event.detail.sectionId == 'blog') {
    if( slider != null) {
      slider.destroy()
    }
    slider = tns(sliderConfig);
  }
});