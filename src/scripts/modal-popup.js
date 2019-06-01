$(document).ready(function() {
    var popup = $("#popupModal");
    var closePopupButtons = $("#popupModal [href='#close-modal']");
    if(document.cookie.match('(^|;) ?' + "ccpopup" + '=([^;]*)(;|$)') == null) {
        popup.addClass("active");
    }

    Array.prototype.forEach.call(closePopupButtons, function(button) {
        button.addEventListener('click', function(event) {
            popup.removeClass("active");
            // Set cookie on close
            var date = new Date();
            var maxAgeDays = 30;
            date.setTime(date.getTime() + (maxAgeDays*24*60*60*1000));
            var expires = "expires="+date.toUTCString();
            document.cookie = "ccpopup=false;" + expires + ";path=/";
        })
    })

})