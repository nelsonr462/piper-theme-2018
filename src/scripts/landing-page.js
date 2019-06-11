$(".quick-checkout").submit(function(e) {
    e.preventDefault();
    $(".qc-submit").attr("disabled", true);
    $(".qc-hint").removeClass("d-invisible");
    $.post("/cart/add", $(this).serialize())
    .done(function(data) {
        var code;
        switch(window.location.pathname) {
            case "/pages/4-dad":
                code = "4DAD";
            break;

            case "/pages/4-mom":
                code = "4MOM";
            break;

            default:
                code = "";
        }

        window.location.href = "/discount/" + code + "?redirect=%2Fcheckout"
    }).fail(function(error) {
        console.log(error);
    })
    
    
    return false;  
})
