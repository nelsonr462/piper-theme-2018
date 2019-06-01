$(".quick-checkout").submit(function(e) {
    e.preventDefault();
    $(".qc-submit").attr("disabled", true);
    $(".qc-hint").removeClass("d-invisible");
    $.post("/cart/add", $(this).serialize())
    .done(function(data) {
        window.location.href = "/discount/4MOM?redirect=%2Fcheckout"
    }).fail(function(error) {
        console.log(error);
    })
    
    
    return false;  
})
