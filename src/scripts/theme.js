window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
// =require slate/a11y.js
// =require slate/cart.js
// =require slate/utils.js
// =require slate/rte.js
// =require slate/sections.js
// =require slate/currency.js
// =require slate/images.js
// =require slate/variants.js

/*================= Modules ================*/
// =require video-modals.js
// =require homepage-active.js

/*================ Sections ================*/
// =require sections/navbar-main.js
// =require sections/product.js

/*================ Templates ================*/
// =require templates/customers-addresses.js
// =require templates/customers-login.js

$(document).ready(function() {
  var sections = new slate.Sections();
  sections.register('product', theme.Product);

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });

  // Target tables to make them scrollable
  var tableSelectors = '.rte table';

  slate.rte.wrapTable({
    $tables: $(tableSelectors),
    tableWrapperClass: 'rte__table-wrapper',
  });

  // Target iframes to make them responsive
  var iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"]';

  slate.rte.wrapIframe({
    $iframes: $(iframeSelectors),
    iframeWrapperClass: 'rte__video-wrapper'
  });

  // Apply a specific class to the html element for browser support of cookies.
  if (slate.cart.cookiesEnabled()) {
    document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
  }

  // Ajaxify Mailchimp forms
  var activeMailchimpForm = null;

  $('[name="mc-embedded-subscribe-form"]').ajaxChimp({
    callback: mailchimpCallback
  });

  $('[name="mc-embedded-subscribe-form"]').on('submit', function(event) {
    console.log(event.target.parentElement);
    activeMailchimpForm = $(event.target.parentElement).attr('data-component');
    console.log(activeMailchimpForm);
  })

  function mailchimpCallback(resp) {
    var responseSelector = activeMailchimpForm + ' [data-id="mce-response"]';

    if(resp.result === 'success') {
      $(responseSelector).addClass('active success');
      $(responseSelector).text('Thanks! A confirmation email has been sent!');
    } else {
      $(responseSelector).addClass('active error');
      $(responseSelector).text('Error: ' + resp.msg.substr(3));
    }

    setTimeout(function() {
      $(responseSelector).removeClass('active success error');
    }, 5000);
  }

});
