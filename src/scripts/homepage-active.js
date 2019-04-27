// For all interactive, decorative javascript on homepage

$(document).ready(function() {
    
    // Carrer Text Loop
    var careers = ["Engineers", "Artists", "Scientists", "Inventors", "Teachers"];
    var careerElement = $("#careerLoop");

    function careerLoop(index) {
        careerElement.text(careers[index]);
        careerElement.animate({
            opacity: 1,
        }, 400)

        return setTimeout(function() {
            var careerIndex = (index==careers.length - 1 ? 0 : index + 1);
            careerElement.animate({
                opacity: 0,
            }, 400, function () {
                careerLoop(careerIndex);
            })
        }, 3000)
    }

    careerLoop(0);
});