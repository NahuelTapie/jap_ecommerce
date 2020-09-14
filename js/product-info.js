function productInfo(){
    $.getJSONData("https://japdevdep.github.io/ecommerce-api/product/5678.json");
}

var productComments = [];

function showProductInfo(array, arrayComments){

    let htmlContentToAppendComm = "";
    let htmlContentToAppend = "";
    let htmlCarousel = "";

    htmlCarousel += `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="3000" style="margin: auto;">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="`+productInfo.images[0]+`" alt="First slide" style="max-height: 92.618vh;">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="`+productInfo.images[1]+`" alt="Second slide" style="max-height: 92.618vh;">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="`+productInfo.images[2]+`" alt="Third slide" style="max-height: 92.618vh;">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="`+productInfo.images[3]+`" alt="Third slide" style="max-height: 92.618vh;">
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="`+productInfo.images[4]+`" alt="Third slide" style="max-height: 92.618vh;">
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
    document.getElementById("carousel").innerHTML = htmlCarousel;

    htmlContentToAppend += `
    <div style="height: 450px">
    <h2><strong>`+ productInfo.name +`</strong></h2><br>
    <div style="box-sizing: border-box; width: 660px; float: right;">
    <h4><strong>Descripción</strong></h4>
    <p style="font-size: 120%;">` + productInfo.description +`</p><br><br>
    </div>
    <h4 style="position:relative; left: 9%; top: 100px;">` + `<span style="color: green;"><strong>`+productInfo.currency+`</strong></span>` + " "+ productInfo.cost +`</h4>
    <small style="position:relative; left: 10%; font-size: 16px; bottom: 10px; top: 100px; text-decoration: underline;">` + productInfo.soldCount + ` vendidos</small>
    </div>
    <hr>
    `


    document.getElementById("prodInfo").innerHTML = htmlContentToAppend;

    for(let i = 0; i < productComments.length; i++){
        var calification = "";
        let comments = productComments[i];

        for (let i= 1; i <= comments.score; i++) {
            calification += `<span class="fa fa-star checked"></span>`
        }

        for(let i = comments.score + 1; i <= 5; i++){
            calification += `<span class="fa fa-star"></span>`
        }

        htmlContentToAppendComm +=`
        <div style="position: relative; width: 85%; margin: auto;">
            <h5>`+ `<span style="font-size: 150%; position:relative; top: 4px;" class="fa fa-user"></span>` + " " + `<strong>`+ comments.user+ `</strong>` + " " +`${calification}` + `<span style="float: right; font-size: 15px;">`+comments.dateTime+`<span>` +`</h5>
            <p style="position:relative; left: 27px;">`+comments.description+`</p>
        </div>
        `


        document.getElementById("prodComments").innerHTML = htmlContentToAppendComm;
    } 


}

function getRating(){
    var elements = document.getElementsByName("rating");
    for(var i = 0; i < elements.length; i++){
        if(elements[i].checked){
            return parseInt(elements[i].value);
        }
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

    let userLogged = localStorage.getItem('user-logged');
    if(userLogged){
        document.getElementById("comments-cont").style = "display: block; position:relative ; margin: auto; width: 85%; height: 155px;";
    }

    document.getElementById("star").innerHTML = `
        <div class="stars-rating">
        <input id="star-5" type="radio" name"rating" value="5"/>
        <label for="star-5" title="5 stars">
        <i class="active fa fa-star"></i>
        </label>

        <input id="star-4" type="radio" name"rating" value="4"/>
            <label for="star-4" title="4 stars">
            <i class="active fa fa-star"></i>
        </label>

        <input id="star-3" type="radio" name"rating" value="3"/>
            <label for="star-3" title="3 stars">
            <i class="active fa fa-star"></i>
        </label>

        <input id="star-2" type="radio" name"rating value="2"/>
            <label for="star-2" title="2 stars">
            <i class="active fa fa-star"></i>
        </label>

        <input id="star-1" type="radio" name"rating" value="1" checked/>
            <label for="star-1" title="1 stars">
            <i class="active fa fa-star"></i>
        </label>
        </div>
    `;

    document.getElementById("submit-comment").addEventListener("click", function(){
        let now = new Date();

        let dateTime = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} `;
        dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` ;

        let newComment = {
            calification: getRating(),
            comment: document.getElementById("new-comment").value,
            user: JSON.parse(localStorage.getItem('user-logged')).email,
            dateTime: dateTime
        };

        productComments.push(newComment);

        showProductInfo(productInfo, productComments);

    })

});