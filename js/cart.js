function CartInfo(){
    $.getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json");
}

var CartArray = {};

function showCartInfo(){
    let htmlContentToAppend = "";
    for(let i = 0; i < Array.length; i++){
        var Cart = CartArray.articles[i];

        function totalProduct(val){
            let number = parseInt(val);
            total = Cart.unitCost * val;
            return total;
        }
    

    htmlContentToAppend +=`
    <h1>`+ Cart.name +`</h1>
    <h4>`+ Cart.count +`</h4>
    <h5>`+ Cart.unitCost +`</h5>
    <h6>`+ Cart.currency +`</h6>
    <span><img src="`+ Cart.src +`"></span><br><br><br>


    <table class="tcart cart-page">
        <thead style="text-align: center;">
        <tr style="text-align: center;">
        <td>Producto</td>
        <td>Cantidad</td>
        <td>Eliminar</td>
        <td>Valor unitario</td>
        <td>Valor total</td>
        </tr>
        <tr>
        <td style="border: 1px solid #696969"><div style="display: flex;"><img class="cartImg" src="`+ Cart.src +`"><h2 style="float: left;">`+ Cart.name +`</h2></div></td>
        <td style="border: 1px solid #696969"><div><button type="button" onclick="remove()" style="border-color: rgba(118, 118, 118, 0.3); margin-right: 5px;"><span>-</span></button><input type="number" id="cartCount" style="text-align: center; cursor: text;" value="`+ Cart.count +`" size="4" maxlength="12" disabled onchange="totalProduct(this.value)"></input><button type="button" onclick="add()" style="border-color: rgba(118, 118, 118, 0.3); margin-left: 5px;"><span>+</span></button></div></td>
        <td style="border: 1px solid #696969"><span class="material-icons" onclick="removeItem()">remove_shopping_cart</span></td>
        <td style="border: 1px solid #696969" id="unitCost">`+ Cart.unitCost +`</td>
        <td style="border: 1px solid #696969"><span id="totalProduct"></span>`+ totalProduct() +`</td>
        </tr>
        </thead>
    </table>
    <br><br>
    `
    document.getElementById("CartInfo").innerHTML = htmlContentToAppend;
    }
}

function remove(){
    let inputNumber = document.getElementById("cartCount");
    let newNumber = parseInt(inputNumber.value) - 1;
    inputNumber.value = newNumber;
}

function add(){
    let inputNumber = document.getElementById("cartCount");
    let newNumber = parseInt(inputNumber.value) + 1;
    inputNumber.value = newNumber;
}

function removeItem(){
    let button = document.getElementsByClassName("material-icons");
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){


    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            CartArray = resultObj.data;
            showCartInfo();
        }
    });
});