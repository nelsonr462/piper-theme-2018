$(".quick-checkout").click(function (e) { 
    e.preventDefault();
    $(".quick-checkout button").attr("disabled", true);
    addBundle($(".quick-checkout").attr("bundle"));
});

function addBundle(bundleItems) {
    bundleItems = bundleItems.split(',');
    Shopify.queue = [];
    for (var i = 0; i < bundleItems.length; i++) {
        Shopify
            .queue
            .push({variantId: bundleItems[i]});
    }
    Shopify.moveAlong = function () {
        // If we still have requests in the queue, let's process the next one.
        if (Shopify.queue.length) {
            var request = Shopify.queue.shift();
            var data = 'id=' + request.variantId + '&quantity=1'
            $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                dataType: 'json',
                data: data,
                success: function (res) {
                    Shopify.moveAlong();
                },
                error: function () {
                    // if it's not last one Move Along
                    if (Shopify.queue.length) {
                        Shopify.moveAlong()
                    }
                }
            });
        } else {
            //redirect
            $(".quick-checkout button").attr("disabled", false);
            window.location.href="/cart";
        }
    };
    Shopify.moveAlong();
};