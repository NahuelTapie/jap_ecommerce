function productInfo(){
    $.getJSONData("https://japdevdep.github.io/ecommerce-api/product/5678.json");
}

var productComments = [];

function showProductInfo(array, arrayComments){

    let htmlContentToAppendComm = "";
    let htmlContentToAppend = "";

    htmlContentToAppend += `
    <h4>`+ productInfo.name +`</h4>
    <p>` + productInfo.description +`</p><br><br>
    <h5>` +productInfo.currency+ " "+productInfo.cost +`</h5>
    <small>` + productInfo.soldCount + ` vendidos</small>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="3000" style="width:75%; margin: auto;">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="`+productInfo.images[0]+`" alt="First slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="`+productInfo.images[1]+`" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="`+productInfo.images[2]+`" alt="Third slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="`+productInfo.images[3]+`" alt="Third slide">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="`+productInfo.images[4]+`" alt="Third slide">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    `

    document.getElementById("prodInfo").innerHTML = htmlContentToAppend;

    for(let i = 0; i < productComments.length; i++){
        var rate = "";
        let comments = productComments[i];


        htmlContentToAppendComm +=`
        <div>`+comments.description+`</div>
        `
        document.getElementById("prodComments").innerHTML = htmlContentToAppendComm;
    } 
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            productComments = resultObj.data;
        }
    })

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productInfo = resultObj.data;
            showProductInfo(productInfo, productComments);
        }
    });
});