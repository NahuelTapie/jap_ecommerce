var CartArray = [];
let curren = "USD ";

function convert(currency, unitCost){
    if(currency === "UYU"){
        return unitCost / 40;
    }else{
        return unitCost;
    }
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

        <td class="center" id="totalProduct${i}">${subTotal}</td>
        </tr>
        `
        document.getElementById("cartItems").innerHTML = htmlContentToAppend;
    }
}



function totalProduct(i, dollars) {
    let inputNumber = document.getElementById(`cartCount${i}`);
    let newNumber = parseInt(inputNumber.value);
    total = dollars * newNumber;
    document.getElementById(`totalProduct${i}`).innerHTML = curren + total;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            CartArray = resultObj.data.articles;
            showCartInfo(CartArray);
        }
    });
});