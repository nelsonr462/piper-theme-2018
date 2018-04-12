var sliderConfig = {
  container: '.carousel',
  nav: true,
  controls: false,
  arrowKeys: true,
  // controlsContainer: '.carousel-controls',
  navContainer: '.carousel-nav',
  items: 1,
  loop: false,
  slideBy: 1,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayButton: false,
  autoplayButtonOutput: false,
  lazyload: true,
  gutter: 10,
  mouseDrag: true,
  responsive: {
      "600": {
          items: 2
      },
      "800": {
          items: 3
      },
      "1920": {
          items: 5
      }
  },
  onInit: detectIE
}
var slider = tns(sliderConfig);

/**
 * detect IE
 * add css fix to IE for carousel
 */
function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  var trident = ua.indexOf('Trident/');

  if( msie > 0 || trident > 0) {
    console.log('IE');
    document.getElementById('tns1-iw').classList.add('ie');
  }
}

// Rebuild carousel in Shopify theme editor after section change
window.addEventListener('shopify:section:load', function(event) {
  if (event.detail.sectionId == 'edu-main') {
    if( slider != null) {
      slider.destroy()
    }
    slider = tns(sliderConfig);
  }
});