/*
-cargar json
-recorrer json
-crear html con los datos del json
-pintar html al navegador
*/
createApp = function() {
    /*
    -pedir data al servidor (AJAX)
    -retornar Data
    */
    var dataObj = {};

    $.ajax({
        url: "./data/data.json",
        type: "GET",
        dataType: "json",
        success: function(response) {
            createHTMLfromData(response);
            addEvents();
        },
        error: function(xhr) {
            console.log(xhr)
        }
    });
    return dataObj;
}
createHTMLfromData = function(data) {
    /*
    -recibir Data
    -transformar a html
    -pintar HTML
    -agregar eventos
    */
    var htmlContent = '';
    var productContainer = $('.list-products');

    $.each(data.products, function(key, product){
        var contentProduct = createProductTemplate(product);
        htmlContent += contentProduct;
    });

    console.log(htmlContent)

    productContainer.append(htmlContent);


}

createProductTemplate = function(productData){
    var htmlContent = '';

    htmlContent = '<div class="product-container" data-available="' + productData.available + '" data-best-seller="' + productData.best_seller + '">' +
    '<img src="' + productData.img + '"/>' +
    '<div class="product-name">Nombre: ' + productData.name + '</div>' +
    '<div class="product-lastname">id: ' + productData.id + '</div></div>';

    return htmlContent;
}

addEvents = function(){
    var buttonShowAvailable = $('.show-available');
    var buttonShowBestSeller = $('.show-best-seller');


    buttonShowAvailable.on('click', function(){
        resetProduct();
        $('.product-container').filter(function( ) {
            return $( this ).data( "available" ) === true;
        })
        .addClass('product-container-available');
    });

    buttonShowBestSeller.on('click', function(){
        resetProduct();
        $('.product-container').filter(function( ) {
            return $( this ).data( "best-seller" ) === true;
        })
        .addClass('product-container-best-seller');
    });
}

resetProduct = function(){
    var products = $('.product-container');
    products.removeClass('product-container-available product-container-best-seller');
}



//Crear aplicacion
createApp();
