window.onload = function() {
    // Get all necessary elements, set prices and status thresholds
    var orderDetails = document.querySelectorAll("li.result");
    var kitInput = document.getElementById("kitInput");
    var total = document.getElementById("total");
    var compare = document.getElementById("compare");
    var savings = document.getElementById("savings");
    var createInvoiceButton = document.getElementById("createInvoice");
    var downloadInvoiceButton = document.getElementById("downloadInvoice");
    var invoiceModal = document.getElementById("invoice-modal");
    var closeModalButtons = document.querySelectorAll("[href='#close-modal']");
    var thresholds = [1, 3, 10, 0, 0]
    var bundleItems = [];

    var kitPrice = 29900;
    var comparePrice = kitPrice + 5000;
    var vpdPrice = 35000;
    var ppcPrice = 10000;

    // ========== MAIN ==========

    // Create array of bundle items
    for( var i = 0; i < orderDetails.length; i++ ) {
        var item = new BundleItem(orderDetails[i], thresholds[i]);
        bundleItems.push(item);    
    }

    // Update price and list to intial kit count of 3
    updateList(3);
    updatePrice(3);
    updateImage(3);

    // Add input change listener to update bundle items
    // according to kit count
    kitInput.addEventListener('change', function( event ) {
        updateList(this.value);
        updatePrice(this.value);
        updateImage(this.value);
    })

    createInvoiceButton.addEventListener('click', function( event ) {
        invoiceModal.classList.add("active");
    })

    for(var i = 0; i < closeModalButtons.length; i++ ) {
        closeModalButtons[i].addEventListener('click', function( event ) {
            invoiceModal.classList.remove('active');
        })        
    }


    // ========== CLASSES/FUNCTIONS ==========
    // BundleItem class
    function BundleItem( element, kitMultiplier ) {
        this.kitMultiplier = kitMultiplier;
        this.itemName = element.getAttribute("data-item-name");
        this.countElement = element.querySelector(".amount");
        this.statusElement = element.querySelector(".icon");
        this.count = 0;
        this.status = false;
        this.setCount = function( count ) {
            if( this.countElement != null ) {
                this.countElement.innerHTML = count;
            }

            if( count > 0 ) {
                this.setStatus( true );
            } else {
                this.setStatus( false );
            }
        };

        this.setStatus = function( status ) {
            if( status ) {
                this.statusElement.classList.replace("icon-cross", "icon-check");
            } else {
                this.statusElement.classList.replace("icon-check", "icon-cross");
            }
        };

        this.update = function( kitCount ) {
            if(this.kitMultiplier > 0) {
                this.setCount( Math.floor(kitCount/this.kitMultiplier) );
            } else if(this.kitMultiplier === 0) {
                this.setCount(kitCount > 0 ? 1 : 0);
            }
        }
    }

    // Update list items
    function updateList( kitCount ) {
        for( var i = 0; i < bundleItems.length; i++ ) {
            bundleItems[i].update(kitCount);
        }
    }

    // Update Bundle Image
    function updateImage( kitCount ) {
        var bundleImages = document.querySelectorAll(".bundle-img");
        var display = ["", "block", ""];

        if ((kitCount >= 0) && (kitCount < 3)) {
            display = ["block", "", ""]; 
        } else if ((kitCount >= 3) && (kitCount < 10)) {
            display = ["", "block", ""];
        } else if (kitCount >= 10) {
            display = ["", "", "block"];
        }

        bundleImages.forEach(function(image, index) {
            if(image.style.display != display[index]) {
                image.style.display = display[index];
            }
        })
    }

    // Update price, comparePrice, and discount
    function updatePrice( kitCount ) {
        var totalPrice = kitCount*kitPrice;
        var totalCompare = kitCount*comparePrice;
        var totalSavings = totalCompare - totalPrice;

        if( kitCount === 1 ) {
            totalPrice = kitCount*comparePrice + 5000;
            totalCompare = kitCount*comparePrice + ppcPrice;
            totalSavings = totalCompare - totalPrice;
        }

        totalPrice = formatMoney(totalPrice, "normal");
        totalCompare = formatMoney(totalCompare, "strike");
        totalSavings = formatMoney(totalSavings, "span");

        total.innerHTML = totalPrice;
        compare.innerHTML = totalCompare;
        savings.innerHTML = totalSavings;
    }

    // Format money for Price container
    function formatMoney( amount, format ) {
        var formatted = slate.Currency.formatMoney(amount);
        var cents = formatted.slice(-2);
        formatted = formatted.slice(0, formatted.length - 2);

        cents = "<sup>" + cents + "</sup>"
        formatted = formatted + cents;

        if (format == 'strike') {
            formatted = "<strike>" + formatted + "</strike>";
        }

        return formatted;
    }

    // Request Invoice 
    function requestInvoice() {
        var request = new XMLHttpRequest();
        request.addEventListener("load", reqListener);
        request.addEventListener("error", errorListener);
        request.open("POST", "https://us-central1-piper-tools.cloudfunctions.net/app/api/invoice");
        request.send({
            "test": "this is a test"
        });


        function reqListener() {
            console.log(this.responseText);
        }

        function errorListener() {
            console.log("Request failed");
        }
    }
}