window.onload = function() {
    // Handle Quantity Input Field
    var updateButton = document.getElementById('update');
    var quantityFields = document.querySelectorAll('.quantity-input');
    var highValueInput = document.createElement('input');

    highValueInput.className = 'quantity-input form-input';
    highValueInput.name = 'updates[]';
    highValueInput.type = 'text';
    highValueInput.value = 10;

    for( var i = 0; i < quantityFields.length; i++ ) {
        quantityFields[i].addEventListener('change', function(event) {
            if( event.target.nodeName == "SELECT" && event.target.value == 10) {
                var itemId = event.target.id;
                var newInput = highValueInput.cloneNode(true);
                newInput.id = itemId;
                event.target.parentNode.replaceChild(newInput, event.target);
                newInput.addEventListener('change', newInputChange);
                newInput.addEventListener('blur', newInputBlur);
                newInput.focus();
            } else {
                updateButton.click();
            }
        })
    }

    function newInputChange() {
        updateButton.click();
    }

    function newInputBlur() {
        updateButton.click();
    }

    // Handle Quote Modal
    var trigger = $("#triggerQuote");
    var popup = $("#quoteModal");
    var closePopupButtons = $("#quoteModal [href='#close-modal']");
    
    trigger.click(function (event) {
        event.preventDefault();
        popup.addClass("active");
    })

    Array.prototype.forEach.call(closePopupButtons, function(button) {
        button.addEventListener('click', function(event) {
            popup.removeClass("active");
        })
    })

}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

if(getCookie("discount_code") != '') {
    var subtotal = document.querySelector('.cart-subtotal');
    subtotal.innerHTML += "<br /><span class='discount-msg text-success'>Discounts will be applied at checkout.</span>"
}