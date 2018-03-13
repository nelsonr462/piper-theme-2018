window.onload = function() {
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
}