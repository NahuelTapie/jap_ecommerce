var CartArray = {};


function showCartInfo() {
    let htmlContentToAppend = "";
    for (let i = 0; i < Array.length; i++) {
        let Cart = CartArray.articles[i];

        let subTotal = Cart.unitCost * Cart.count;

        htmlContentToAppend += `
        <tr>
            <td style="border: 1px solid #696969"><div style="display: flex;"><img class="cartImg" src="${Cart.src}"><h2 style="float: left;">` + Cart.name + `</h2></div></td>
            <td style="border: 1px solid #696969; text-align:center;"><input type="number" id="cartCount${i}" style="text-align: center;" value="` + Cart.count + `" onchange="totalProduct(${i},${Cart.unitCost})"></td>
            <td style="border: 1px solid #696969"><span style="display:block; text-align: center;" class="material-icons" onclick="removeItem()">remove_shopping_cart</span></td>
            <td style="border: 1px solid #696969; text-align: center;" id="unitCost">`+ Cart.currency + " " + Cart.unitCost + `</td>
            <td style="border: 1px solid #696969; text-align: center;"><span>${Cart.currency} </span><span id="totalProduct${i}">${subTotal}</span></td>
        </tr>
        `
        document.getElementById("cartItems").innerHTML = htmlContentToAppend;
    }
}


function totalProduct(i, unitCost) {
    let inputNumber = document.getElementById(`cartCount${i}`);
    let newNumber = parseInt(inputNumber.value);
    total = unitCost * newNumber;
    document.getElementById(`totalProduct${i}`).innerHTML = total;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            CartArray = resultObj.data;
            showCartInfo();
        }
    });
});