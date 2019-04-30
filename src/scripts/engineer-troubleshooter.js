$(document).ready(function() {
    // Get all troubleshooter step links
    var stepLinks = $("a.stepLink");
    var resultPage = $(".ts-end");
    var resultMsg = document.getElementById("ts-result");
    var resultDevice = document.getElementById("ts-device");
    var currentPage;
    
    if(location.hash) {
        currentPage = $(location.hash);
        $(".eng-ts").removeClass('active');
        currentPage.addClass("active");
        $(document).scrollTop(0);
    }
        

    Array.prototype.forEach.call(stepLinks, function(stepLink) {
        // Add onClick listener
        stepLink.addEventListener('click', function(event) {
            // event.preventDefault();
            //Get current page
            var currentPageId = event.currentTarget.getAttribute("data-current");
            var currentPage = $(currentPageId);

            // Determine if result link or nav link
            var href = event.currentTarget.href;
            var device = event.currentTarget.getAttribute("data-device");
            var msg = event.currentTarget.getAttribute("data-msg");
            
            // If result link
            if(href.indexOf("result") != -1 && device) {
                // Add message
                resultMsg.innerHTML = msg;
                // Change input device type
                resultDevice.value = device;

                currentPage.removeClass("active");
                resultPage.addClass("active");
            } else {
                // If navigation link
                location.hash = event.currentTarget.getAttribute("href");
            }
        })

    });

    window.addEventListener('hashchange', function() {
        if(location.hash != "#sidebar" && location.hash != "#close") {
            $(".eng-ts").removeClass('active');

            if (location.hash == '') {
                location.hash = "#ts-start"
                $('#ts-start').addClass('active');
                currentPage = $("#ts-start");
            } else {
                $(location.hash).addClass('active');
                currentPage = $(location.hash);
            };

            $(document).scrollTop(0);
        }
    })
});