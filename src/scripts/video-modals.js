$(document).ready(function() {
    // Get all necessary elements
    var openVideoButtons = document.querySelectorAll("[href='#openVideo']");
    var videoModal = document.getElementById("videoModal");
    var closeModalButtons = document.querySelectorAll("[href='#close-modal']");
    var modalContent = document.querySelector("#videoModal .modal-content");

    Array.prototype.forEach.call(openVideoButtons, function (button) {
        // ========== MAIN ==========
        button.addEventListener('click', function( event ) {
            var videoElement = document.createElement('div');
            var loadingElement = document.createElement('div');
    
            // Add Spectre loading classes and append to modal
            loadingElement.className = 'loading loading-lg';
            modalContent.appendChild(loadingElement);
    
            // Add video responsive and use embed code from Shopify Theme Editor
            videoElement.classList.add('video-responsive');
            videoElement.innerHTML = this.getAttribute("data-embed-code");
    
            // Remove loading animation on iframe load
            var iframeElement = videoElement.firstChild;
            iframeElement.onload = function() {
                modalContent.removeChild(loadingElement);
            }
            
            // Append iframe, open modal
            modalContent.appendChild(videoElement);
            videoModal.classList.add("active");
        })

    })


    // Setup closing 
    for( var i = 0; i < closeModalButtons.length; i++ ) {
        closeModalButtons[i].addEventListener('click', function( event ) {
            var videoElement = document.querySelector("#videoModal .video-responsive");
            var loadingElement = document.querySelector("#videoModal .loading");
            videoModal.classList.remove('active');
            modalContent.removeChild(videoElement);

            if (loadingElement) {
                modalContent.removeChild(loadingElement);
            }
        })        
    }
});