const ORDER_ASC_BY_PRICE = "price -> PRICE"
const ORDER_DESC_BY_PRICE = "PRICE -> price"

var productsArray = [];
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(cond, array){
    let result = [];

    if (cond === ORDER_ASC_BY_PRICE){
        result = array.sort(function (a, b){
            if(a.cost < b.cost){return -1;}
            if(a.cost > b.cost){return 1;}
            return 0;
        });

    }else if(cond === ORDER_DESC_BY_PRICE){
        result = array.sort(

            function(a, b){

                if(a.cost > b.cost){
                    return -1;
                }

                if(a.cost < b.cost){
                    return 1;
                }

                return 0;

        });
    }


        return result;
}

//-------------------------------

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

        htmlContentToAppend += `
        <div class="prod-group-item prod-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name +`</h4>
                        <p>` + category.description +`</p><br><br>
                        <h5>` +category.currency+ " "+category.cost +`</h5>
                        </div>
                        <small class="text-muted">` + category.soldCount + ` vendidos</small>
                    </div>

                </div>
            </div>
        </div>
        `
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            productsArray = sortProducts(ORDER_ASC_BY_PRICE, productsArray);

            showProductsList(productsArray);
        }
    });

    document.getElementById("sortPriceAsc").addEventListener("click",function(){
        productsArray = sortProducts(ORDER_ASC_BY_PRICE, productsArray);

        showProductsList(productsArray);
    });

    document.getElementById("sortPriceDesc").addEventListener("click", function(){
        productsArray = sortProducts(ORDER_DESC_BY_PRICE, productsArray);

        showProductsList(productsArray);
    });

    document.getElementById("filter").addEventListener("click", function () {


        minPrice = document.getElementById("minimPrice").value;
        maxPrice = document.getElementById("maximPrice").value;
    
        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }
    
        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }
        showProductsList(productsArray);
    });
    
    document.getElementById("clean").addEventListener("click", function () {
        document.getElementById("minimPrice").value = "";
        document.getElementById("maximPrice").value = "";
    
        minPrice = undefined;
        maxPrice = undefined;
    
        showProductsList(productsArray);
    });
});