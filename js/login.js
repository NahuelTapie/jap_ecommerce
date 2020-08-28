addEventListener("DOMContentLoaded", function(e){
	document.getElementsByClassName("btn").addEventListener("onclick", function(){
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




 
