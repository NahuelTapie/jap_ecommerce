function CartInfo(){
    $.getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json");
}

var CartArray = {};

function totalProduct(i, unitCost){
    let val = document.getElementById(`cartCount${i}`).value;
    let number = parseInt(val);
    total = unitCost * number;
    document.getElementById(`totalProduct${i}`).innerHTML = total;
}

function showCartInfo(){
    let htmlContentToAppend = "";
    for(let i = 0; i < Array.length; i++){
        var Cart = CartArray.articles[i];
    

    htmlContentToAppend +=`
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
        <td style="border: 1px solid #696969"><input type="number" id="cartCount${i}" style="text-align: center;" value="`+ Cart.count +`" onchange="totalProduct(${i},${Cart.unitCost})"></input></td>
        <td style="border: 1px solid #696969"><span class="material-icons" onclick="removeItem()">remove_shopping_cart</span></td>
        <td style="border: 1px solid #696969" id="unitCost">`+ Cart.unitCost +`</td>
        <td style="border: 1px solid #696969"><span id="totalProduct${i}"></span></td>
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