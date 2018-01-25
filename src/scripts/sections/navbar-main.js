var openLink = '#sidebar';
var closeLink = '#close';
var toggle = document.querySelector('.off-canvas-toggle[href="#sidebar"]');

// Support for IE11 hashchange event
if(!window.HashChangeEvent)(function(){
	var lastURL=document.URL;
	window.addEventListener("hashchange",function(event){
		Object.defineProperty(event,"oldURL",{enumerable:true,configurable:true,value:lastURL});
		Object.defineProperty(event,"newURL",{enumerable:true,configurable:true,value:document.URL});
		lastURL=document.URL;
	});
}());

// Use hashchange event to toggle hamburger function
window.addEventListener('hashchange', function(event) {
    setTimeout(function() {
        if(event.newURL.indexOf('#sidebar') == -1) {
            toggle.href = openLink;
        } else {
            toggle.href = closeLink;
        }
    }, 100);
});