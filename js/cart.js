var CartArray = [];
let curren = "USD ";

function convert(currency, unitCost){
    if(currency === "UYU"){
        return unitCost / 40;
    }else{
        return unitCost;
    }
}

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++){
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    calcEnvio();
}

function totalProduct(i, dollars) {
    let inputNumber = document.getElementById(`cartCount${i}`);
    let newNumber = parseInt(inputNumber.value);
    stotal = dollars * newNumber;
    document.getElementById(`totalProduct${i}`).innerHTML = curren + stotal;
    calcTotal();
}

function showCartInfo(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {

        let Cart = array[i];

        let dollars = convert(Cart.currency, Cart.unitCost);

        let subTotal = curren + dollars * Cart.count;

        htmlContentToAppend += `
        <tr>
        <td style="width: 125px; height: 117px;"><img src="${Cart.src}" class="cartImg" alt="${Cart.name} image"></td>

        <td><h4>${Cart.name}</h4></td>
        
        <td class="center"><input type="number" class="cartInput" id="cartCount${i}" value="${Cart.count}" onchange="totalProduct(${i},${dollars})"></td>
        
        <td class="center"><span id="removeItem" class="material-icons">remove_shopping_cart</span></td>

        <td class="center">USD ${dollars}</td>

        <td class="center"><span id="totalProduct${i}" class="subtotal">${subTotal}</span></td>
        </tr>
        `
        document.getElementById("cartItems").innerHTML = htmlContentToAppend;
    }
    calcTotal();
}

function calcEnvio(){
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;

    let elements = document.getElementsByName("shipping");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }

    let totalConEnvio = total + envio;

    let contenido = `
    <span>
        <p>${total}</p>

        <p>${totalConEnvio}</p>

    </span>
    `

    document.getElementById("total").innerHTML = contenido;
}


function paymentMethod(select){
    if(select.value=== "0"){
     document.getElementById('creditCard').style.display = "block";
     document.getElementById('bankTransfer').style.display = "none";
    }if(select.value === "1"){
     document.getElementById('bankTransfer').style.display = "block";
     document.getElementById('creditCard').style.display = "none";
    }
}

function percentage(){
    let elements = document.getElementsByName("shipping");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }

    document.getElementById("percentageShipp").innerText = envio;
}


function alert(){
    document.getElementById("alerta").style.display = "inline-block";
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            CartArray = resultObj.data.articles;
            showCartInfo(CartArray);
            percentage();
            calcEnvio()
        }
    });

    let elements = document.getElementsByName("shipping");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function(){
            percentage();
            
        });
    }

    
});

document.getElementById("modalConfirm").addEventListener("click", function(){
    validation();
});
var name = document.getElementById("credName");
var lastn = document.getElementById("credLastn"); 
var crednum = document.getElementById("credNumb");
var credcode = document.getElementById("credCode");
var expiration = document.getElementById("credExp");

var bankName = document.getElementById("bankName");
var bankLastn = document.getElementById("bankLastn");
var bankNumber = document.getElementById("bankNumber");
function validation(){
    let empty = false
    if(document.getElementById("paymentMethod").value === "0"){
        if(name.value === ""){
            empty = "Nombre titular"
        }
        if(lastn.value === ""){
            empty = "Apellido titular"
        }
        if(crednum.value === ""){
            empty = "Número de tarjeta"
        }
        if(credcode.value === ""){
            empty = "Código de seguridad"
        }
        if(expiration === ""){
            empty = "Fecha de vencimiento"
        }
    }else{
        if(bankName.value === ""){
            empty = "Nombre titular"
        }
        if(bankLastn.value === ""){
            empty = "Apellido titular"
        }
        if(bankNumber.value === ""){
            empty = "Número de tarjeta"
        }
    }if(empty === false){
        document.getElementById("empty").style.display = inline-block;
    }else{
        document.getElementById("emptyf").style.display = inline-block;
    }
}