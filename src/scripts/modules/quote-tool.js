var orderDetails = document.querySelectorAll("li.result");
var kitInput = document.getElementById("kitInput");
var total = document.getElementById("total");
var compare = document.getElementById("compare");
var savings = document.getElementById("savings");
var thresholds = [1, 3, 3, 10, 10, 10, 10]
var bundleItems = [];

var kitPrice = 24999;
var comparePrice = kitPrice + 5000;


for(var i = 0; i < orderDetails.length; i++ ) {
    var item = new BundleItem(orderDetails[i], thresholds[i]);
    bundleItems.push(item);    
}

updateList(3);
updatePrice(3);

kitInput.addEventListener('change', function(event) {
    updateList(this.value);
    updatePrice(this.value);
})

function BundleItem(element, kitMultiplier) {
    this.kitMultiplier = kitMultiplier;
    this.countElement = element.querySelector(".amount");
    this.statusElement = element.querySelector(".icon");
    this.count = 0;
    this.status = false;
    this.setCount = function(count) {
        if(this.countElement != null) {
            this.countElement.innerHTML = count;
        }

        if(count > 0) {
            this.setStatus(true);
        } else {
            this.setStatus(false);
        }
    };

    this.setStatus = function(status) {
        if(status) {
            this.statusElement.classList.replace("icon-cross", "icon-check");
        } else {
            this.statusElement.classList.replace("icon-check", "icon-cross");
        }
    };

    this.update = function(kitCount) {
        this.setCount(Math.floor(kitCount/this.kitMultiplier));
    }
}

function updateList( kitCount ) {
    for( var i = 0; i < bundleItems.length; i++ ) {
        bundleItems[i].update(kitCount);
    }
}

function updatePrice( kitCount ) {
    var totalPrice = kitCount*kitPrice;
    var totalCompare = kitCount*comparePrice;
    var totalSavings = totalCompare - totalPrice;

    totalPrice = formatMoney(totalPrice, "normal");
    totalCompare = formatMoney(totalCompare, "strike");
    totalSavings = formatMoney(totalSavings, "span");

    total.innerHTML = totalPrice;
    compare.innerHTML = totalCompare;
    savings.innerHTML = totalSavings;
}


function formatMoney(amount, format) {
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