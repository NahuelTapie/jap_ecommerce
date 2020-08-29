addEventListener("DOMContentLoaded", function(e){
	document.getElementsByClassName("btn").addEventListener("click", function(){
		let email = getElementsByClassName("email");
		let password = getElementsByClassName("pass");
		let campo = true;

		if (email.value = ""){
			email.classList.add("inválido");
			campo = false;
		}

		if (pass.value = ""){
			pass.classList.add("inválido");
			campo = false;
		}

		if (campo){
			localStorage.setItem("email", JSON.stringify({mail = email.value}));
			window.location = "index.html";
		}else{
			alert("No deben haber espacios en blanco");
		}
	})
});




 
const inputs = document.querySelectorAll(".input");


function add() {
	let input = this.parentNode.parentNode;
	input.classList.add("focus");
}

function remove() {
	let input = this.parentNode.parentNode;
	if (this.value == "") {
		input.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", add);
	input.addEventListener("blur", remove);
});
