$(".quick-checkout").submit(function(e) {
    e.preventDefault();
    $(".qc-submit").attr("disabled", true);
    $(".qc-hint").removeClass("d-invisible");
    $.post("/cart/add", $(this).serialize())
    .done(function(data) {
        var discount = $(e.currentTarget).attr("data-discount");
        window.location.href = "/discount/" + discount + "?redirect=%2Fcart"
    }).fail(function(error) {
        console.log(error);
    })
    
    
    return false;  
})

/* <form class="quick-checkout" data-discount="YEAREND" method="post" action="/cart/add">
    <div class="form-group">
        <input type="hidden" name="id" value="13285654167596">
        <input type="submit" value="ADD TO CART" class="btn btn-primary btn-lg qc-submit">
        <p class="form-input-hint qc-hint d-invisible" style="color: white;">Order being created...<i style="padding-right: 2rem" class="form-icon loading"></i></p>
        <h6>Promo code automatically applied at checkout</h6>
    </div>
</form> */