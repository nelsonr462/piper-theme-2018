var slider = tns({
    container: '.carousel',
    nav: true,
    controls: false,
    arrowKeys: true,
    // controlsContainer: '.carousel-controls',
    navContainer: '.carousel-nav',
    items: 1,
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
  });

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